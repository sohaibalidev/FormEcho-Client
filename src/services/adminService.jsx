import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  async getUsers(page = 1, limit = 20) {
    const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  async updateUserStatus(userId, status) {
    const response = await api.patch(`/admin/users/${userId}/status`, status);
    return response.data;
  },

  async updateUserTier(userId, tier) {
    const response = await api.patch(`/admin/users/${userId}/tier`, { tier });
    return response.data;
  },

  async markPayment(userId, paid) {
    const response = await api.patch(`/admin/users/${userId}/payment`, {
      paid,
    });
    return response.data;
  },

  async suspendUser(userId, suspended) {
    const response = await api.patch(`/admin/users/${userId}/suspend`, {
      suspended,
    });
    return response.data;
  },
};
