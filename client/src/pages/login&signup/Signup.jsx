import { Label } from "@radix-ui/react-label";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  // This component renders a signup form with fields for username, email, and password.
  // It includes a title, a subtitle, and a button to submit the form.
  // The form is styled with Tailwind CSS classes for layout and appearance.
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    // This function updates the state with the input values from the form fields.
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    // This function handles the form submission for signing up.
    e.preventDefault();
    // Here you would typically send the input data to your backend for processing.
    console.log("Sign Up Data:", input);
    // Reset the input fields after submission
    try {
      setLoading(true);
      // Make a POST request to the backend API for user registration
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for CORS
        }
      );
      if (res.data.success) {
        // If the sign-up is successful, you can redirect the user or show a success message
        navigate("/login");
        console.log("Sign up successful:", res.data);
        toast.success(res.data.message);
        setInput({ username: "", email: "", password: "" });
        // Reset the input fields after successful sign up
        // Optionally, redirect the user or show a success message
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during sign up."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center   h-screen ">
      <form
        onSubmit={signUpHandler}
        className="shadow-lg flex flex-col gap-5 p-10 bg-transparent rounded-lg"
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
            name="username"
            value={input.username}
            onChange={changeHandler}
            placeholder="Enter your username"
            className={"focus-visible:ring-transparent my-2"}
          />
        </div>
        <div>
          <Label className="py-2 font-medium">Email</Label>
          <Input
            type="text"
            name="email"
            value={input.email}
            onChange={changeHandler}
            placeholder="Enter your email"
            className={"focus-visible:ring-transparent my-2"}
          />
        </div>
        <div>
          <Label className="py-2 font-medium">password</Label>
          <Input
            type="text"
            name="password"
            value={input.password}
            onChange={changeHandler}
            placeholder="Enter your password"
            className={"focus-visible:ring-transparent my-2"}
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            please wait...
          </Button>
        ) : (
          <Button type={"submit"}>Signup</Button>
        )}
        <span className="text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#FCCF28]">
            Login
          </Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Signup;
