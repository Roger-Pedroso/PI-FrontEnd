/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export default api;
