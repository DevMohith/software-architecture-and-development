import axios from "axios";

// Recipe Vault API (Port 5000)
export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication API (Port 5002)
export const authClient = axios.create({
  baseURL: "http://localhost:5002/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
