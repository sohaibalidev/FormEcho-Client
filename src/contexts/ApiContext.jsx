import React, { createContext, useState, useContext } from "react";
import { apiService } from "@/services/apiService";

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const [apiKeys, setApiKeys] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStats = async () => {
    setLoading(true);
    try {
      const res = await apiService.getStats();
      if (res.success) setStats(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const res = await apiService.getApiKeys();
      if (res.success) setApiKeys(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async ({ name }) => {
    setLoading(true);
    try {
      const res = await apiService.createApiKey({ name });
      if (res.success) {
        setApiKeys((prev) => [...prev, res.data]);
        return res.data;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (updates) => {
    setLoading(true);
    try {
      const res = await apiService.updateApiKey(updates);
      if (res.success) {
        setApiKeys((prev) =>
          prev.map((k) => (k._id === res.data._id ? res.data : k))
        );
        return res.data;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getApiKeyUsage = async (id) => {
    setLoading(true);
    try {
      const res = await apiService.getApiKeyUsage(id);
      return res.success ? res.data : null;
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      const messageData = await apiService.getMessages(page, limit);
      setMessages(messageData.messages);
      return messageData;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    stats,
    apiKeys,
    loading,
    messages,
    getStats,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    getApiKeyUsage,
    getMessages,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
