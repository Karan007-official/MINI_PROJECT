import axios from "axios";

const API = "http://localhost:5000";

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);

export const registerUser = (data) =>
  axios.post(`${API}/register`, data);

export const getCategories = () =>
  axios.get(`${API}/categories`);

export const getExpenses = (id) =>
  axios.get(`${API}/expenses/${id}`);

export const addExpense = (data) =>
  axios.post(`${API}/expenses`, data);

export const deleteExpense = (id) =>
  axios.delete(`${API}/expenses/${id}`);