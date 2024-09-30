import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9595/api/cars',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
