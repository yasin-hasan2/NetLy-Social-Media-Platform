import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";
import { setPosts } from "@/redux/postSlice";
import { toast } from "sonner";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  // const [comment, setComment] = useState(selectedPost?.comments);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    // Limit the input text to 100 characters
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  // const sentMessageHandler = async () => {
  //   alert("Comment sent: " + text);
  //   // Here you would typically send the comment to your backend
  //   console.log("Comment sent:", text);
  //   setText(""); // Reset the input field after sending the comment
  // };

  const sentMessageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/post/${selectedPost._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
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

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className={
            "lg:max-w-[50rem] border border-amber-300 p-0 flex flex-col"
          }
        >
          <div className="flex    flex-1 gap-2">
            <div className="w-1/2  ">
              <img
                className="w-full h-full object-cover rounded-l-lg"
                src={selectedPost?.image}
                alt="post_image"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex  items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Link>
                    <Avatar>
                      <AvatarImage
                        src={selectedPost?.author?.profilePicture}
                        alt="author_img"
                      ></AvatarImage>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link className="text-sm font-semibold">
                      {selectedPost?.author?.username}
                    </Link>

                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent
                    className={"flex flex-col items-center text-sm text-center"}
                  >
                    <div className="cursor-pointer w-full text-[#FCCF28]">
                      Unfollow
                    </div>
                    <div className="cursor-pointer w-full ">
                      add to favorites
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {comment?.map((comment) => (
                  <Comment key={comment._id} comment={comment}></Comment>
                ))}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder="Add a comment ..."
                    className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                  />
                  <Button
                    disabled={!text.trim()}
                    onClick={sentMessageHandler}
                    variant={"outline"}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
