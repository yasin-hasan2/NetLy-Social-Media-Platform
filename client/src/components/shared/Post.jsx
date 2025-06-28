import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "../ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
// import { Input } from "../ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "../ui/badge";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  // console.log(text);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  // console.log(posts);
  const [liked, setLiked] = useState(post.likes?.includes(user?._id) || false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  // console.log("comment:", comment);

  const dispatch = useDispatch();
  // const [deleteOpen, setDeleteOpen] = useState(false);
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    // Limit the input text to 100 characters
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  // Function to handle the like button click
  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `https://netly-social-media-platform-g76x.vercel.app/api/v1/post/${post._id}/${action}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        // Update the posts in the Redux store
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error liking or disliking post:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while liking or disliking the post."
      );
    }
  };

  // Function to handle the comment button click
  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `https://netly-social-media-platform-g76x.vercel.app/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText(""); // Clear the input field after posting the comment
        // Optionally, you can update the comments in the post state or Redux store
        // For example, you might want to fetch the updated post data or update it directly
      }
    } catch (error) {
      console.error("Error handling comment:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while handling the comment."
      );
    }
  };
  // console.log("comment:", commentHandler);

  // delete post handler

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `https://netly-social-media-platform-g76x.vercel.app/api/v1/post/delete/${post._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedPosts = posts.filter(
          (postItem) => postItem._id !== post?._id
        ); // Assuming the response contains the updated posts
        dispatch(setPosts(updatedPosts));
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

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `https://netly-social-media-platform-g76x.vercel.app/api/v1/post/${post._id}/bookmark`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <div className="flex items-center gap-3">
            <h1>{post.author?.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant={"secondary"}>Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {post?.author?._id !== user?._id && (
              <Button
                variant={"ghost"}
                className={"cursor-pointer w-fit text-[#FCCF28] font-bold"}
              >
                Unfollow
              </Button>
            )}

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
                      variant={"destructive"}
                      className={"cursor-pointer w-full my-2"}
                    >
                      Confirm
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
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-[#FBCF28]"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className={"cursor-pointer text-gray-600 hover:text-[#FBCF28]"}
            />
          )}

          <MessageCircle
            size={"22px"}
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className={"cursor-pointer text-gray-600 hover:text-[#FBCF28]"}
          />
          <Send
            size={"22px"}
            className={"cursor-pointer text-gray-600 hover:text-[#FBCF28]"}
          />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          className={"cursor-pointer text-gray-600 hover:text-[#FBCF28]"}
        />
      </div>
      <span className="font-medium block mb-2">{postLike} Likes </span>
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
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer"
        >
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center gap-2">
        <input
          type={"text"}
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className={"outline-none text-sm w-full my-2"}
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#FCCF28] cursor-pointer font-semibold"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
