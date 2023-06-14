import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';
axios.defaults.headers.post= {
  'x-csrf-token': document.querySelector('[name="csrf-token"]').getAttribute('content')

}
export const apiService = {
  
  getProducts: async function() {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async function(id) {
    try {
      const response = await axios.get(`${baseUrl}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  createProduct: async function(data) {
    try {
      const response = await axios.post(`${baseUrl}/products`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async function(id, data) {
    try {
      const response = await axios.put(`${baseUrl}/products/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  deleteProduct: async function(id) {
    try {
      const response = await axios.delete(`${baseUrl}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getCategories: async function() {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCategory: async function(id) {
    try {
      const response = await axios.get(`${baseUrl}/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async function(data) {
    try {
      const response = await axios.post(`${baseUrl}/categories`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async function(id, data) {
    try {
      const response = await axios.put(`${baseUrl}/categories/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async function(id) {
    try {
      const response = await axios.delete(`${baseUrl}/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}

export default apiService;
