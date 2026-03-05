import axios from "axios";

const api = axios.create({
  baseURL: "https://trizen-fhme.onrender.com/api"
});

export default api;
