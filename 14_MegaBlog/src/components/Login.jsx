import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// using react-hook-form
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");

	/** we are making another login function and not using handleSubmit directly because
	 * handleSubmit is a method that accepts a method to handle the form submission  // handleSubmit itself is an event
	 * basically it is a higher order function // handle submit can be considered as a wrapper function or simply a keyword of sorts
	 */
	const login = async (data) => {
		setError("");
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) dispatch(authLogin(userData));
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline">
						Sign Up
					</Link>
				</p>

				{error && (
					<p className="text-red-600 text-center mt-8">{error}</p>
				)}
				<form onSubmit={handleSubmit(login)} className=" mt-8">
					<div className=" space-y-5">
						{/* this is our input component and not the html one  
                        the ...register is syntax used from react-hook-form so we can refer to its documentation but this is how we will use it 
                        it is necessary to spread the register so that it does not overwrite other values where register is used*/}
						<Input
							label="Email: "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) ||
										"Email address must be a valid address",
								},
							})}
						/>
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
