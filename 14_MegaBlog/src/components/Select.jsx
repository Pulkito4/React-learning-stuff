import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
	const id = useId();
	return (
		<div className="w-full">
			{label && <label htmlFor={id} className=""></label>}
			<select
				{...props}
				id={id}
				ref={ref}
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
				{/* we will use an optional looping to run loop only if option has some values, otherwise using map on options when it has no values will make the app crash for sure */}

				{options?.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

export default React.forwardRef(Select);
