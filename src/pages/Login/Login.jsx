import React, { useEffect, useState } from "react";
// import "./login.css";
import { BsArrowUpRight } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";

import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      try {
        const userData = { email, password };
        dispatch(login(userData));
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    if (isError) {
      // toast.error(message);
      toast({
        title: `Invalid credentials`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    if (user || isSuccess) {
      toast({
        title: "Action Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="h-screen overflow-hidden flex w-4/5 m-auto sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5">
      {/*  */}
      <div
        className="hidden md:flex-1 w-1/2 relative text-center text-white  mt-2.5 mb-2.5 rounded-tl-2xl rounded-bl-2xl  bg-cover bg-center xl:block lg:hidden md:hidden sm:hidden lg:rounded-md md:rounded-md sm:rounded-md registerImageSide"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/5707182/pexels-photo-5707182.jpeg?auto=compress&cs=tinysrgb&w=600)",
        }}
      >
        <div
          className="w-full h-full rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-2xl"
          style={{ backgroundColor: "rgba(14, 13, 13, 0.519)" }}
        >
          <div
            className="absolute bottom-5 left-2/4"
            style={{ transform: "translate(-50%, -50%)", lineHeight: "1.8em" }}
          >
            <p className="text-lg my-5  ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptate deserunt porro commodi eveniet. Soluta aliquid natus
              explicabo earum, doloremque atque! Earn money by sharing hottest
              news in your area. It's that simple
            </p>

            <Link to="/register">
              <span
                className="text-white p-4 cursor-pointer rounded-xl text-base"
                style={{ backgroundColor: "#4a7c59" }}
              >
                Are you new here?
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="flex-1 w-1/2  mt-2.5 mb-2.5 rounded-tr-2xl rounded-br-2xl"
        style={{ backgroundColor: "#4a7c59" }}
      >
        <h2 className="text-white text-center text-4xl mb-5 mt-2.5">
          The best Reporting App
        </h2>
        <h4 className="text-white text-center text-lg mb-5">
          What do you have for us Today
        </h4>
        <form
          onSubmit={handleSubmit}
          className="flex gap-5 flex-col w-11/12 m-auto mt-4"
        >
          <input
            className="px-2.5 py-4 text-sm outline-none border-none text-white"
            style={{
              background: "transparent",
              borderBottom: "1px solid white",
              // fontSize: "15px",
            }}
            type="email"
            name=""
            id=""
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="px-2.5 py-4 text-sm outline-none border-none text-white"
            style={{
              background: "transparent",
              borderBottom: "1px solid white",
              // fontSize: "15px",
            }}
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="p-4 flex items-center justify-center gap-3 text-center rounded-xl cursor-pointer"
            style={{
              backgroundColor: "white",
              color: "#4a7c59",
            }}
            onClick={handleSubmit}
          >
            <button type="submit">Login to Continue</button>
            <BsArrowUpRight />
          </div>

          <div
            className="p-4 flex items-center justify-center gap-3 text-center rounded-xl cursor-pointer"
            style={{
              backgroundColor: "white",
              color: "#4a7c59",
            }}
          >
            <FcGoogle style={{ fontSize: "28px" }} />
            <span>Login with Google</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
