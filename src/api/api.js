import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8084/web_order", // Spring Boot backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;