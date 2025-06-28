import { setUserProfile } from "@/redux/authSlice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  // const [userProfile, setUserProfile] = useState(null)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/${userId}/profile`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
          console.log("user fetched successfully:", res.data.user);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};

export default useGetUserProfile;
