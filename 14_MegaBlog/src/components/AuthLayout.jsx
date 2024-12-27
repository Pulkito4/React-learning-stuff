/** this is a protection mechanism to protect our pages or routes
 * from unauthorized access. It is a higher order component that takes in a prop called authentication which is set to true by default.
 * If the authentication prop is set to true, it will render the children components passed to it.
 * If the authentication prop is set to false, it will redirect the user to the login page.
 * This is a simple way to protect our routes from unauthorized access.
 * We can use this component to protect our routes in the App.js file.
 * If we want to protect a route, we can wrap the route component with this component and set the authentication prop to true.
 * If we want to allow access to a route without authentication, we can set the authentication prop to false.
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		// easy way

		// if(authStatus === true){
		//     navigate('/');
		// }else if(authStatus === false){
		//     navigate('/login');
		// }

		/** authStatus !== authentication
		 * can be written/used as
		 * let authValue = authStatus ===true? true : false
		 * then use this authValue in the if condition  */
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}

		setLoader(false);
	}, [authStatus, navigate, authentication]);
	return loader ? <h1>Loading...</h1> : <>{children}</>;
}
