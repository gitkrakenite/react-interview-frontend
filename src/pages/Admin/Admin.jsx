import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import Spinner from "../../components/Spinner";
import moment from "moment";

import { getAllNews, updateArticle } from "../../features/news/newsSlice";
import { logout, reset } from "../../features/auth/authSlice";

import axios from "../../axios";

const Admin = () => {
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // access the news
  const { news, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.news
  );

  const { user } = useSelector((state) => state.auth);

  const handleUpdate = async (reportId) => {
    try {
      const payload = { status };
      const response = await axios.put(
        `/news/admin/update/${reportId}`,
        payload
      );
      if (response) {
        toast({
          title: "Updated Successfully. Refresh to see changes",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getAllNews());
  }, [news, status, navigate, isError, message, dispatch]);

  return (
    <div className="">
      <div className="block p-2.5">
        <div className="adminNewsLayout">
          <div className="bg-slate-100 rounded-bl-xl rounded-br-xl top-0 sticky z-50">
            <h2
              className="text-white p-2.5 rounded-bl-xl rounded-br-xl m-5"
              style={{ backgroundColor: "#4a7c59" }}
            >
              Hello {user && user.name}. You are in Admin Page
            </h2>
            <div className="block md:flex gap-12 p-2.5 items-center">
              <div className="imgSide">
                <img
                  className="h-20 w-20 object-cover rounded-full"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <div className="">
                <p>Name: {user && user.name}</p>
                <p>Email: {user && user.email}</p>
              </div>
              <div className="">
                <span
                  className="text-white p-3.5 rounded-lg cursor-pointer"
                  style={{ backgroundColor: "rgb(197, 44, 44)" }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2
              className="text-white p-2.5 rounded-xl mb-5"
              style={{ backgroundColor: "#4a7c59" }}
            >
              All Posted Articles
            </h2>

            {news?.map((item) => (
              <div className=" p-2.5 rounded-xl  shadow-md" key={item._id}>
                <div className="mb-2.5 flex flex-wrap gap-2.5">
                  <h6
                    className="text-base mb-2.5 text-white p-1.5 rounded-md"
                    style={{ backgroundColor: "rgb(172, 115, 10)" }}
                  >
                    Posted {moment(item.createdAt).fromNow()}
                  </h6>
                  <h3
                    className="text-base mb-2.5 text-white p-1.5 rounded-md"
                    style={{ backgroundColor: "brown" }}
                  >
                    Name: {item.name || "Anonymous"}
                  </h3>
                  <span
                    className="text-base mb-2.5 text-white p-1.5 rounded-md"
                    style={{ backgroundColor: "purple" }}
                  >
                    Email:{" "}
                    <a href={`mailto:${item.email}`} style={{ color: "white" }}>
                      {item.email || "Anonymous"}
                    </a>
                  </span>
                  <p
                    className="text-base mb-2.5 text-white p-1.5 rounded-md"
                    style={{ backgroundColor: "teal" }}
                  >
                    Status: {item.status}
                  </p>
                </div>
                <p>{item.description}</p>
                <img
                  className="h-36 w-36 object-cover rounded-sm mt-1"
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                />
                <div className="mt-5 mb-5">
                  <form className="flex items-center gap-5">
                    <label htmlFor="status">Update Status</label>
                    <select
                      name="status"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Received">Received</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Rated">Rated</option>
                      <option value="Won">Won</option>
                    </select>
                    <span
                      className="text-white cursor-pointer px-3.5 py-3 rounded-md"
                      style={{ backgroundColor: "rgb(197, 44, 44)" }}
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </span>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Admin;
