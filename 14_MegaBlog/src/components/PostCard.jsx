import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// $id = post ki id
// featuredImage = ismien image ki id automatically aati hai
function PostCard({ $id, title, featuredImage }) {
	// the id variable is used as $id to avoid conflict with the id attribute of the html element
	// this is just a syntax part of appwrite
	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					<img
						src={appwriteService.getFilePreview(featuredImage)}
						alt={title}
						className="rounded-xl"
					/>
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default PostCard;
