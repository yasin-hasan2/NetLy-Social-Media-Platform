import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  //   console.log(suggestedUsers);
  return (
    <div className="my-10">
      <div className="flex items-center justify-between gap-6">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers?.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage
                    src={user?.profilePicture}
                    alt="post_image"
                  ></AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <div className="">
                <h1 className="font-semibold text-sm">
                  {" "}
                  <Link to={`/profile/${user?._id}`}>
                    {user?.username}
                  </Link>{" "}
                </h1>
                <span className="text-gray-600 text-sm">
                  {" "}
                  {user?.bio || "Bio here ..."}{" "}
                </span>
              </div>
            </div>
            <span className="text-[#FBCF28] text-xs font-bold cursor-pointer hover:text-[#c5af63]">
              Follow
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
