import React from "react";

function BgButton({ color, onClick }) {
	return (
		<button
			className="outline-none px-4 rounded-full py-1 text-white shadow-lg"
			style={{ backgroundColor: color }}
            onClick={onClick}
            >
			{color}
		</button>
	);
}

export default BgButton;
