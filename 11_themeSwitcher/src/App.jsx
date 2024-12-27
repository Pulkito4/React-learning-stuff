import { useState, useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./context/Theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {
	const [themeMode, setThemeMode] = useState("light");

	//these methods were onitially defined in the Theme.js file but wee didnt provide any functionality there
	// so we can redefine them here and they work jsut fine i.e their funcationality gets update there

	const lightTheme = () => {
		setThemeMode("light");
	};

	const darkTheme = () => {
		setThemeMode("dark");
	};

	//actual change in theme
	useEffect(() => {
		document.querySelector("html").classList.remove("light", "dark");
		document.querySelector("html").classList.add(themeMode);
	}, [themeMode]);

	return (
		<ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
			<div className="flex flex-wrap min-h-screen items-center">
				<div className="w-full">
					<div className="w-full max-w-sm mx-auto flex justify-end mb-4">
						<ThemeBtn />
					</div>

					<div className="w-full max-w-sm mx-auto">
						<Card />
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
