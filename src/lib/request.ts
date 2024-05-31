import axios from "axios";

const cr = axios.create({
  baseURL: process.env.REACT_APP_WEB_API_BASE_URL,
  withCredentials: true,
});

export default cr;
