import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/post/all", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
          console.log("Posts fetched successfully:", res.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGetAllPost;
