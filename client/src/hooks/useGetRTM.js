import { setMessages } from "@/redux/chatSlice";

// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socketio);
  const { messages } = useSelector((store) => store.chat);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => {
      socket?.off("newMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, setMessages]);
};

export default useGetRTM;
