import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const submit = async (data) => {
		if (post) {
		  // update post
		  const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
	  
		  if (file) {
			// delete old file
			appwriteService.deleteFile(post.featuredImage); // becuase featuredImage mein id ho toh stored hai and delete mein yehi toh chaiye
		  }
	  
		  const dbPost = await appwriteService.updatePost(post.$id, {
			...data,
			slug:post.slug,
			featuredImage: file ? file.$id : undefined,
		  });
	  
		  if (!dbPost) {
			console.log('Post update failed');
			return;
		  }
	  
		  console.log('Post updated:', dbPost);
		  navigate(`/post/${dbPost.$id}`);
		} else {
		  // create post
		  const file = await appwriteService.uploadFile(data.image[0]);
	  
		  if (!file) {
			console.log('File upload failed');
			return;
		  }
	  
		  const fileId = file.$id;
		  data.featuredImage = fileId;


// here is the edit
// Check if userData is defined before accessing its $id property
if (!userData) {
    console.log('User data is undefined');
    return;
  }

  const userId = userData.$id;


		  const dbPost = await appwriteService.createPost({
			...data,
			userId: userId,
		  });
	  
		  if (!dbPost) {
			console.log('Post creation failed');
			return;
		  }
	  
		  console.log('Post created:', dbPost);
		  navigate(`/post/${dbPost.$id}`);
		}
	  };

	// important method to convert title into slug // helpful for interviews and SEO
	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string") {
			// one way to do it
			// const slug = value.toLowerCase().replace(/ /g, '-');
			// setValue('slug', slug);
			// return slug;

			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-") // ^ = negate => [^a-zA-Z\d\s] => not a-z, A-Z, 0-9, space i.e. inko chhodke baaki sbko globally match karo and then hyphen se replace krdo
				.replace(/\s/g, "-"); // globally \s i.e space ko hyphen se replace karo
		}
		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue(
					"slug",
					slugTransform(value.title, { shouldValidate: true })
				);
			}
		});

		return () => subscription.unsubscribe(); // unsubscribe to avoid memory leak // optimization
	}, [watch, slugTransform, setValue]);

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/>
				<RTE
					label="Content :"
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={appwriteService.getFilePreview(
								post.featuredImage
							)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full">
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
}
