import { setMessages } from "@/redux/chatSlice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(
          `https://netly-social-media-platform-g76x.vercel.app/api/v1/message/all/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
          // console.log("Posts fetched successfully:", res.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);
};

export default useGetAllMessage;
