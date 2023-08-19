import axios from 'axios';

// Configurar el interceptor para agregar el token en el encabezado de autorización
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axios;