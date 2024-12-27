import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
	// this works fine but we are using loader concept to optimize it
	// const [data, setData] = useState([]);
	// useEffect(() => {
	// 	fetch("https://api.github.com/users/pulkito4")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setData(data);
	// 		});
	// }, []);

	const data = useLoaderData();

	return (
		<div className="text-center m-4 text-white p-4 text-3xl bg-gray-600">
			Github followers:{data.followers}
			<img src={data.avatar_url} alt="Git Picture" width={300} />
		</div>
	);
}

export default Github;

export const githubInfoLoader = async () => {
	const response = await fetch("https://api.github.com/users/pulkito4")
	return response.json();
};
