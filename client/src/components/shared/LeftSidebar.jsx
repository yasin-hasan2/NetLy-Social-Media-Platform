import {
  CreativeCommons,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";
// import store from "@/redux/store";
// import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  //   const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        // Optionally, redirect to login or home page
        window.location.href = "/login"; // Redirect to login page
        // navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout."
      );
      console.error("Logout failed:", error);
    }
  };

  // Define sidebar items with icons and labels

  const sidebarItems = [
    {
      icon: <Home />,
      label: "Home",
    },
    {
      icon: <Search />,
      label: "Search",
    },
    {
      icon: <TrendingUp />,
      label: "Explore",
    },
    {
      icon: <MessageCircle />,
      label: "Messages",
    },
    {
      icon: <Heart />,
      label: "Notifications",
    },
    {
      icon: <PlusSquare />,
      label: "Create",
    },
    {
      icon: (
        <Avatar className={"w-8 h-8 cursor-pointer"}>
          <AvatarImage src={user?.profilePicture} alt="@Profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      label: "Profile",
    },
    {
      icon: <LogOut />,
      label: "Logout",
    },
  ];

  // const createPostHandler = () => {
  //   setOpen(true);
  // };
  const sidebarHandler = (textType) => {
    // alert(`You clicked on ${textType}`);
    if (textType === "Logout") {
      logOutHandler();
      toast.success("Logged out successfully");
    } else if (textType === "Create") {
      setOpen(true);
    }
    // else {
    //   // Handle other sidebar item clicks
    //   console.log(`You clicked on ${textType}`);
    // }
  };

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.label)}
                key={index}
                className="flex items-center gap-4 relative p-2 hover:bg-gray-200 cursor-pointer my-3"
              >
                <div className="">{item.icon}</div>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
