// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://bookitserver-ujuw.onrender.com/api", // backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
