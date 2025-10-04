import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const apiService = {
  async getStats() {
    const response = await api.get("/api-keys/stats");
    return response.data;
  },

  async getApiKeys() {
    const response = await api.get("/api-keys/keys");
    return response.data;
  },

  async createApiKey({ name, tier = "free" }) {
    const response = await api.post("/api-keys/keys", { name, tier });
    return response.data;
  },

  async updateApiKey({ id, name, tier, action }) {
    const response = await api.put(`/api-keys/keys/${id}`, { name, tier, action });
    return response.data;
  },

  async getApiKeyUsage(id) {
    const response = await api.get(`/api-keys/usage?id=${id}`);
    return response.data;
  },

  async getMessages(page = 1, limit = 20) {
    const response = await api.get(`/messages`);
    return response.data;
  },
};
