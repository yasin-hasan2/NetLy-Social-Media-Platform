import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
      // Optionally, you can also set the caption or other post details here
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    // console.log(file, caption);
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    console.log("File in CreatePost:", file);
    console.log("ImagePreview in CreatePost:", imagePreview);
    console.log("FormData in CreatePost:", formData);
    console.log("Caption in CreatePost:", caption);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/post/addPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts])); // Update the posts in the Redux store
        toast.success(res.data.message);
        setOpen(false);

        // Optionally, you can refresh the posts or update the UI
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the post."
      );
      console.error("Error creating post:", error);
      // Handle error, e.g., show a toast notification
      // toast.error("Failed to create post.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  console.log("User in CreatePost:", user);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader className={"text-center font-semibold"}>
            Create New Post
          </DialogHeader>
          <div className="flex items-center  gap-4">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="@Post_Image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-xs">{user?.username}</h1>
              <span className="text-gray-600 text-xs">Bio here</span>
            </div>
          </div>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            autoFocus
            className={"focus-visible:ring-transparent border-none"}
            placeholder="Write a caption ..."
          />
          {imagePreview && (
            <div className="w-full h-64 my-4 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="preview_img"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          )}
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={fileChangeHandler}
          />
          <Button
            onClick={() => imageRef.current.click()}
            className={"w-fit mx-auto bg-[#FBCF26] hover:bg-[#d4be66]"}
          >
            Select from device
          </Button>
          {imagePreview &&
            (loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button onClick={createPostHandler} className={"w-full"}>
                Post
              </Button>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
