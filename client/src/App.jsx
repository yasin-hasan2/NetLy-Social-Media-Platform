import MainLayout from "./layout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/login&signup/Signup";
import Login from "./pages/login&signup/Login";
import Profile from "./pages/users/Profile";
import EditProfile from "./pages/users/EditProfile";
// =========================================
// import Particles from "./components/Particles";
// import Threads from "./components/Threads";
// ==========================================

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
