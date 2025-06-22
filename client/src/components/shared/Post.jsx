import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "../ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
// import { Input } from "../ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  // const [deleteOpen, setDeleteOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    // Limit the input text to 100 characters
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/post/delete/${post._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
        console.log("Post deleted successfully:", res.data.post);
        // Optionally, you can refresh the posts or update the UI
        // For example, you might want to remove the post from the state
        // dispatch(removePost(post._id)); // Assuming you have a removePost action
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the post."
      );
    }
  };

  // Caption logic
  const captionWords = post.caption ? post.caption.split(/\s+/) : [];
  const isLongCaption = captionWords.length > 20;
  const displayedCaption =
    isLongCaption && !showFullCaption
      ? captionWords.slice(0, 20).join(" ") + "..."
      : post.caption;

  return (
    <div className="my-8 w-full max-w-sm  mx-auto border-b border-gray-600">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={post.author?.profilePicture}
              alt="post_image"
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant={"ghost"}
              className={"cursor-pointer w-fit text-[#FCCF28] font-bold"}
            >
              Unfollow
            </Button>
            <Button variant={"ghost"} className={"cursor-pointer w-fit  "}>
              Add to favorites
            </Button>
            {user && user?._id === post?.author?._id && (
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className={"cursor-pointer w-fit "}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="text-center flex flex-col items-center">
                    <h4 className="text-lg font-semibold mb-2">Delete post?</h4>
                    <p className="">
                      Are you sure you want to delete this post?
                    </p>

                    <Button
                      onClick={deletePostHandler}
                      variant={"outline"}
                      className={"cursor-pointer w-full my-2"}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant={"destructive"}
                      className={"cursor-pointer w-full my-2 "}
                    >
                      Cancel
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="w-full  object-cover rounded-lg my-4 border border-gray-300"
        src={post.image}
        alt="post_image"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <FaRegHeart
            size={"22px"}
            className={"cursor-pointer hover:text-gray-600"}
          />
          <MessageCircle
            onClick={() => setOpen(true)}
            className={"cursor-pointer hover:text-gray-600"}
          />
          <Send className={"cursor-pointer hover:text-gray-600"} />
        </div>
        <Bookmark className={"cursor-pointer hover:text-gray-600"} />
      </div>
      <span className="font-medium block mb-2">
        {post.likes?.length} Likes{" "}
      </span>
      <p>
        <span className="font-medium mr-2">@{post.author?.username}:</span>
        {displayedCaption}
        {isLongCaption && !showFullCaption && (
          <button
            className="ml-2 text-blue-500 underline text-xs"
            onClick={() => setShowFullCaption(true)}
          >
            See more
          </button>
        )}
        {isLongCaption && showFullCaption && (
          <button
            className="ml-2 text-blue-500 underline text-xs"
            onClick={() => setShowFullCaption(false)}
          >
            See less
          </button>
        )}
      </p>
      <span onClick={() => setOpen(true)}>View all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center gap-2">
        <input
          type={"text"}
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className={"outline-none text-sm w-full my-2"}
        />
        {text && <span className="text-[#FCCF28]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
