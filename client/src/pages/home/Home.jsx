import Feed from "@/components/feed/Feed";
import RightSidebar from "@/components/shared/RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedusers";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div
      className="flex
  "
    >
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
