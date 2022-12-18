import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useToast } from "@chakra-ui/react";

import Spinner from "../../components/Spinner";
import moment from "moment";

import {
  // createReport,
  // getReports,
  deleteArticle,
  createArticle,
  getNews,
} from "../../features/news/newsSlice";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user } = useSelector((state) => state.auth);

  // access the news
  const { news, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.news
  );

  const userInfoStyle = {
    "@media (max-width: 500px)": {
      display: "block",
      alignItems: "center",
      gap: "50px",
      padding: "10px",
    },
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setImage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !image || !description) {
      toast({
        title: "Title, category and image needed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      try {
        const email = user.email;
        const name = user.name;
        const reportData = { title, image, description, email, name };
        // console.log(profile);
        dispatch(createArticle(reportData));
        console.log(reportData);
        handleClear();

        toast({
          title: "Sent successfully",
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

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  // Delete article
  const handleDelete = (reportId) => {
    console.log(reportId);
    try {
      dispatch(deleteArticle(reportId));
      handleClear();

      toast({
        title: "Cleared successfully",
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
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getNews());
    return () => {
      dispatch(reset());
    };
  }, [user, news, navigate, isError, message, dispatch]);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row  gap-2.5 justify-between p-2.5 dashBoardContainer">
        <div className="">
          <div
            className="rounded-bl-xl rounded-br-xl top-0 sticky z-50"
            style={{ backgroundColor: "rgb(230, 228, 228)" }}
          >
            <h2
              className="text-white p-2.5 rounded-bl-xl rounded-br-xl mb-5"
              style={{ backgroundColor: "#4a7c59" }}
            >
              Hello {user && user.name}. Here is your information
            </h2>
            <div className=" block md:flex gap-12 p-2.5">
              <div className="imgSide">
                <img
                  className="h-20 w-20 object-cover rounded-full"
                  src={user && user.profile}
                  alt={user && user.name}
                />
              </div>
              <div className="textSide my-3.5">
                <p>Your Name: {user && user.name}</p>
                <p>Your Email: {user && user.email}</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <span
                  className="text-white p-3.5 rounded-lg cursor-pointer"
                  style={{ backgroundColor: "rgb(197, 44, 44)" }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
                {user && user.isAdmin === "true" && (
                  <Link to="/admin">
                    <button
                      className="p-3.5 text-white rounded-tr-lg rounded-bl-lg cursor-pointer text-base border-none outline-none"
                      style={{ backgroundColor: "#4a7c59" }}
                    >
                      Admin
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h2
              className="text-white p-2.5 rounded-xl mb-5"
              style={{ backgroundColor: "#4a7c59" }}
            >
              Here are previously posted Articles By you
            </h2>
            {news?.map((item) => (
              <div className=" p-2.5 rounded-xl  shadow-md" key={item._id}>
                <h6 style={{ fontWeight: "bold" }}>
                  Posted {moment(item.createdAt).fromNow()}
                </h6>
                <h5 style={{ fontWeight: "bold" }}>Status: {item.status}</h5>
                <p>{item.description}</p>
                <img
                  className="h-36 w-36 object-cover rounded-sm mt-1"
                  src={item.image}
                  alt={item.title}
                />
                <div className="mt-5 mb-5">
                  <span
                    className="text-white cursor-pointer px-3.5 py-3 rounded-md"
                    style={{ backgroundColor: "rgb(197, 44, 44)" }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete Article
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="top-px sticky z-50 ">
            <h2
              className="text-white p-2.5 rounded-md text-center"
              style={{ backgroundColor: "#4a7c59" }}
            >
              Create A New Article
            </h2>
            <form
              className="flex gap-5 flex-col mt-2.5 "
              style={{}}
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">Suitable Title</label>
              <input
                className="border-b-2 border-black outline-none"
                placeholder="Title for Article"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="description">
                Enter a descriptive description
              </label>
              <textarea
                className="border-b-2 border-black outline-none p-0.5"
                value={description}
                placeholder="Your description"
                rows="4"
                id="description"
                cols="50"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="image">Enter the relevant image URL</label>
              <input
                type="text"
                placeholder="Enter URL here"
                className="border-b-2 border-black outline-none"
                name="image"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button
                className="text-white border-none outline-none p-2.5 rounded-tr-md rounded-bl-md cursor-pointer"
                style={{ backgroundColor: "#4a7c59" }}
                type="submit"
                onClick={handleSubmit}
              >
                Send Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
