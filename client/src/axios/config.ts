import axios from "axios";

const backend_url = process.env.BACKEND_URL || "http://localhost:6100";

const api = axios.create({
  baseURL: `${backend_url}/api/v1`,
});

export default api;
