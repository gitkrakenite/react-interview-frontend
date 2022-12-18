import axios from "../../axios";

// create report
const createNews = async (reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("/news/create", reportData, config);

  return response.data;
};

// get my news
const getNews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/news", config);

  return response.data;
};

// delete my news
const deleteNews = async (reportId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`/news/delete/${reportId}`, config);

  return response.data;
};

// updateNews
const updateNews = async (reportId, status) => {
  const response = await axios.put(`/news/admin/update/${reportId}`, status);
  return response.data;
};

// get all news
const getAllNews = async () => {
  const response = await axios.get("/news/admin");
  return response.data;
};

const reportService = {
  createNews,
  getNews,
  deleteNews,
  getAllNews,
  updateNews,
};

export default reportService;
