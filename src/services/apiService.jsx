import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const apiService = {
  async generateApiKey(tier) {
    const response = await api.post("/api-keys/generate", { tier });
    return response.data;
  },

  async revokeApiKey(keyId) {
    const response = await api.delete(`/api-keys/${keyId}`);
    return response.data;
  },

  async getApiKeys() {
    const response = await api.get("/api-keys");
    return response.data;
  },

  async getMessages(page = 1, limit = 20) {
    const response = await api.get(`/messages?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getStats() {
    const response = await api.get("/stats");
    return response.data;
  },

  async upgradeTier(tier) {
    const response = await api.post("/user/upgrade", { tier });
    return response.data;
  },
};
