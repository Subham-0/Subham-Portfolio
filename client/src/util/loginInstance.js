import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '';

const loginInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default loginInstance;