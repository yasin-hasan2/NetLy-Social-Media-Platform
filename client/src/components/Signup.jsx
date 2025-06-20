import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const signup = () => {
  return (
    <div className="flex items-center justify-center   h-screen bg-gray-100">
      <form
        action=""
        className="shadow-lg flex flex-col gap-5 p-10 bg-white rounded-lg"
      >
        <div>
          <h1 className="text-center font-bold text-xl">LoGo</h1>
          <p className="text-sm text-center">
            Signup to see photo & videos from your friend
          </p>
        </div>
        <div>
          <Label className="py-2 font-medium">User Name</Label>
          <Input
            type="text"
            className={"focus-visible:ring-transparent my-2"}
          />
        </div>
        <div>
          <Label className="py-2 font-medium">Email</Label>
          <Input
            type="text"
            className={"focus-visible:ring-transparent my-2"}
          />
        </div>
        <div>
          <Label className="py-2 font-medium">password</Label>
          <Input
            type="text"
            className={"focus-visible:ring-transparent my-2"}
          />
        </div>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default signup;
