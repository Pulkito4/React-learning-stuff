import { useCallback, useState, useEffect, useRef } from "react";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	// useRef hook
	const passwordRef = useRef(null);

	// using the copy button
	const copyPasstoClipboard = useCallback(() => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 50);

		// the " ? " means optional
		// we have used optional select because what if the current value is 0... in that case we dont want anything selected

		//the selectioRange method is to determine how many character are to be selected

		// the above line uses passwordRef just to give that selected effect to the generated password for better user experience
		// the copy button would work even without the above optimization

		window.navigator.clipboard.writeText(password);   // selection range stuff wouldn't work on this copy to clipbaord line // we would need string slice methods to do so // currently is it still copying the whole password field to clipboard
	}, [password]); // coppying of password is only dependent on the password that will be generated

	const passwordGenerator = useCallback(() => {
		// ye useCall back toh bs ek function definiton h, ye automatically memory mein hi save hoti h, isko run nhi krenge toh kuchh hoga hi nhi
		// run useEffect se krenge
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&+=_-`";

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);  //  ye +1 isliye h kyunki random function 0 se start hota h // but isse remove krna chaiye kyuki hume 0th index ki value chahiye also Math.random() = 1 ke case mein ye +1 would take us out of the range of the string
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);
	// we have used setPassword method as a dependency for optimization // concept of MEMOIZATION is used here

	
	// ye passwordGenerator function ko run krne ke liye h
	// will run once when the component is mounted i.e when page is loaded first time and then will re-run each time any value in the dependency array changes
	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, charAllowed, passwordGenerator]);

	return (
		<>
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700">
				<h1 className="my-3 text-2xl text-center text-white">
					Password Generator
				</h1>
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						value={password}
						className="outline-none w-full py-1 px-3"
						placeholder="Password"
						readOnly
						ref={passwordRef}
						// we have to pass a reference to use the useRef hook
					/>
					<button
						onClick={copyPasstoClipboard}
						className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500">
						Copy
					</button>
				</div>

				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={8}
							max={50}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setLength(e.target.value);
							}}
						/>
						<label>Length:{length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							className="cursor-pointer"
							type="checkbox"
							defaultChecked={numberAllowed}
							id="numberInput"
							onChange={() => {
								setNumberAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							className="cursor-pointer"
							type="checkbox"
							defaultChecked={charAllowed}
							id="characterrInput"
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="characterInput">Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
