import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  fetchCapTable: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/captable`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCapTable: async (capTableId, capTableData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/captable/${capTableId}`, capTableData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  addShareholder: async (shareholderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shareholders`, shareholderData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  issueEquityGrant: async (equityGrantData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/equitygrants`, equityGrantData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/settings`, settingsData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  fetchUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default apiService;