import React, { useEffect, useState } from "react";
// import "./register.css";
import { BsArrowUpRight } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";

import Spinner from "../../components/Spinner";

import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // read from global state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if passwords match
    if (password !== password2) {
      toast({
        title: "Passwords don't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // check validity of values
    if (!name || !email || !password) {
      toast({
        title: "Name, email and password needed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      try {
        const userData = { name, email, profile, password };
        // console.log(profile);
        dispatch(register(userData));
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
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
        title: `Something went wrong`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    if (isSuccess || user) {
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
        className=" hidden md:flex-1 w-1/2 relative text-center text-white  mt-2.5 mb-2.5 rounded-tl-2xl rounded-bl-2xl  bg-cover bg-center xl:block lg:hidden md:hidden sm:hidden lg:rounded-md md:rounded-md sm:rounded-md "
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

            <Link to="/login">
              <span
                className="text-white p-4 cursor-pointer rounded-xl text-base"
                style={{ backgroundColor: "#4a7c59" }}
              >
                Already Have an Account?
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
          Get Started Today
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
            type="text"
            name=""
            id=""
            placeholder="Enter your Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            type="text"
            name=""
            id=""
            placeholder="Enter your profile url"
            required
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
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
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            placeholder="Confirm your password"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          {isLoading ? (
            <Spinner message="Please Wait" />
          ) : (
            <div
              className="p-4 flex items-center justify-center gap-3 text-center rounded-xl cursor-pointer"
              style={{
                backgroundColor: "white",
                color: "#4a7c59",
              }}
              onClick={handleSubmit}
            >
              <button
                type="submit"
                style={{ color: "#4a7c59" }}
                className="border-none text-lg cursor-pointer"
              >
                Register Today
              </button>
              <BsArrowUpRight />
            </div>
          )}

          <div
            className="p-4 flex items-center justify-center gap-3 text-center rounded-xl cursor-pointer"
            style={{
              backgroundColor: "white",
              color: "#4a7c59",
            }}
          >
            <FcGoogle style={{ fontSize: "28px" }} />
            <span>Register with Google</span>
          </div>
          <Link to="/login" className="text-center text-white cursor-pointer">
            <p>Not new here ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
