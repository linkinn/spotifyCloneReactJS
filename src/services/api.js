import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:43221',
});

export default api;
