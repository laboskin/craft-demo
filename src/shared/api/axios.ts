import axios from 'axios';

const BASE_URL = 'https://localhost:3000/api';

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});
