import React, { createContext, useState, useContext } from "react";
import { apiService } from "../services/apiService";

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

  const generateApiKey = async (tier = "free") => {
    setLoading(true);
    try {
      const newKey = await apiService.generateApiKey(tier);
      setApiKeys((prev) => [...prev, newKey]);
      return newKey;
    } finally {
      setLoading(false);
    }
  };

  const revokeApiKey = async (keyId) => {
    setLoading(true);
    try {
      await apiService.revokeApiKey(keyId);
      setApiKeys((prev) => prev.filter((key) => key._id !== keyId));
    } finally {
      setLoading(false);
    }
  };

  const getApiKeys = async () => {
    setLoading(true);
    try {
      const keys = await apiService.getApiKeys();
      setApiKeys(keys);
      return keys;
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

  const getStats = async () => {
    setLoading(true);
    try {
      const statsData = await apiService.getStats();
      setStats(statsData);
      return statsData;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    apiKeys,
    messages,
    stats,
    loading,
    generateApiKey,
    revokeApiKey,
    getApiKeys,
    getMessages,
    getStats,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
