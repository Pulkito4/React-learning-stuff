import React, { useId } from "react";

/**FORWARD REFERENCE IN REACT  (ADVANCED REACT INTERVIEW QUESTION)
 * why to use ? : when you want to pass the ref to the child component
 * but you dont want to consume it in the parent component
 *
 * i.e we have a button component here and it has a state
 * but we dont want to use this state here but use it on the login page
 * so we will use forward ref to pass the ref to the button component i.e now login page button will refer to the state of this button component(its parent)
 *
 * basically waha se reference pass krenge and then yaha wali state ka access uss reference se hoga
 */

const Input = React.forwardRef(function Input(
	{ label, type = "text", className = "", ...props },
	ref
) {
	const id = useId();
	return (
		<div className="w-full">
			{label && (
				<label className="inline-block mb-1 pl-1" htmlFor={id}>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	);
});

export default Input;
