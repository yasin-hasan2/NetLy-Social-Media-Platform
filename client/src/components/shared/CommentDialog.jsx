import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = React.useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    // Limit the input text to 100 characters
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sentMessageHandler = async () => {
    alert("Comment sent: " + text);
    // Here you would typically send the comment to your backend
    console.log("Comment sent:", text);
    setText(""); // Reset the input field after sending the comment
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className={"max-w-5xl p-0 flex flex-col"}
        >
          <section className="flex  flex-1 gap-2">
            <div className="w-1/2">
              <img
                className="w-full h-full object-cover rounded-l-lg"
                src="https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg"
                alt="post_image"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex  items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Link>
                    <Avatar>
                      <AvatarImage></AvatarImage>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link className="text-sm font-semibold">username</Link>

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
                comments section
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder="Add a comment ..."
                    className="w-full outline-none border border-gray-300 p-2 rounded"
                  />
                  <Button
                    disabled={!text.trim()}
                    onclick={sentMessageHandler}
                    variant={"outline"}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
