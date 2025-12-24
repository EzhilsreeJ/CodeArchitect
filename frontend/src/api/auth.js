import axios from "axios";

const BASE = "http://localhost:5000/api/auth";

export const signup = (username, password) =>
  axios.post(`${BASE}/signup`, { username, password });

export const login = (username, password) =>
  axios.post(`${BASE}/login`, { username, password });
