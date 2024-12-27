import { useState } from "react";
import BgButton from "./components/BgButton";

function App() {
	const [color, setColor] = useState("olive");

	return (
		<div
			className="w-full h-screen duration-500"
			style={{ backgroundColor: color }}>
			<div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
				<div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">

					{/* Component based approach */}
					<BgButton color="red" onClick = {()=>setColor("red")} />
					<BgButton color="blue" onClick = {()=>setColor("blue")} />
					<BgButton color="green" onClick = {()=>setColor("green")} />
					<BgButton color="olive" onClick = {()=>setColor("olive")} />
					<BgButton color="purple" onClick = {()=>setColor("purple")} />
					<BgButton color="black" onClick = {()=>setColor("black")} />
					<BgButton color="turquoise" onClick = {()=>setColor("turquoise")} />
					<BgButton color="violet" onClick = {()=>setColor("violet")} />

						{/* Another but more bluky approach */}
					{/* <button
						onClick={() => setColor("green")}
						className="outline-none px-4 rounded-full py-1 text-white shadow-lg"
						style={{ backgroundColor: "green" }}>
						Green
					</button>
					<button
						onClick={() => setColor("blue")}
						className="outline-none px-4 rounded-full py-1 text-white shadow-lg"
						style={{ backgroundColor: "blue" }}>
						Blue
					</button>
					<button
						onClick={() => setColor("purple")}
						className="outline-none px-4 rounded-full py-1 text-white shadow-lg"
						style={{ backgroundColor: "purple" }}>
						Purple
					</button>
					<button
						onClick={() => setColor("yellow")}
						className="outline-none px-4 rounded-full py-1 text-black shadow-lg"
						style={{ backgroundColor: "yellow" }}>
						Yellow
					</button>
					<button
						onClick={() => setColor("lavender")}
						className="outline-none px-4 rounded-full py-1 text-black shadow-lg"
						style={{ backgroundColor: "lavender" }}>
						Lavender
					</button>
					<button
						onClick={() => setColor("black")}
						className="outline-none px-4 rounded-full py-1 text-white shadow-lg"
						style={{ backgroundColor: "black" }}>
						Black
					</button>
					<button
						onClick={() => setColor("pink")}
						className="outline-none px-4 rounded-full py-1 text-black shadow-lg"
						style={{ backgroundColor: "pink" }}>
						Pink
					</button> */}
				</div>
			</div>
		</div>
	);
}

export default App;
