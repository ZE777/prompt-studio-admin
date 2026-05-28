import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// Request 攔截器：自動帶 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response 攔截器：統一錯誤處理
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      window.location.href = '/login'
    }

    if (status === 403) {
      // 之後換成 Toast
      console.error('權限不足')
    }

    if (status >= 500) {
      console.error('伺服器錯誤，請稍後再試')
    }

    return Promise.reject(error)
  }
)

export default api