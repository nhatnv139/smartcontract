import axios from 'axios';

// Tùy chỉnh các tùy chọn cần thiết
const instance = axios.create({
  baseURL: 'https://dev.athene.network', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'secret-api-token': '123Test'
  },
});

export default instance;