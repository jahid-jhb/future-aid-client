import axios from 'axios';

const api = axios.create({
    baseURL: 'https://future-aid-server.vercel.app',
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Error Interceptor
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error.response?.status;
//         if (status === 401 || status === 403) {
//             console.warn('Unauthorized or Forbidden – redirect to login?');
//             // Optional: handle logout or navigation
//         }
//         return Promise.reject(error);
//     }
// );

export default api;
