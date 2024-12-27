import React from "react";

function Button({
	children,
	type = "button",
	bgColor = "bg-blue-600",
	textColor = "text-white",
	className = "",
	...props
}) {
	return (
		// we will allow the user to pass in any props they want
		// the button will use default values of text or background or class name if the user does not pass them
		// but we will allow the user to pass in their own values if they want to
		// ...props will allow the user to pass in any props they want because we are spreading the props object
		// i.e if the user wants to pass in an onClick event handler they can do so
		<button
			className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
			{...props}>
			{children}
		</button>
	);
}

export default Button;
