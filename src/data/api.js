import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('esibha_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(new Error(err.response?.data?.message || 'Something went wrong'))
);

export const productService = {
  getAll:         (params = {}) => api.get('/products', { params }),
  getById:        id            => api.get(`/products/${id}`),
  getBySlug:      slug          => api.get(`/products/slug/${slug}`),
  getFeatured:    ()            => api.get('/products/featured'),
  getBestsellers: ()            => api.get('/products/bestsellers'),
  search:         q             => api.get('/products/search', { params: { q } }),
};

export const finderService = {
  search:  q    => api.get('/finder/search', { params: { q } }),
  request: data => api.post('/finder/request', data),
};

export const orderService = {
  create:     data => api.post('/orders', data),
  getById:    id   => api.get(`/orders/${id}`),
  getHistory: ()   => api.get('/orders/history'),
};

export const labService = {
  getNotes:    ()     => api.get('/lab/notes'),
  preview:     config => api.post('/lab/preview', config),
  submitOrder: data   => api.post('/lab/order', data),
};

export const quizService = {
  getQuestions:  () => api.get('/quiz/questions'),
  submitAnswers: d  => api.post('/quiz/submit', d),
};

export const journalService = {
  getPosts:  (params = {}) => api.get('/journal', { params }),
  getBySlug: slug           => api.get(`/journal/${slug}`),
};

export const authService = {
  login:    d => api.post('/auth/login', d),
  register: d => api.post('/auth/register', d),
  logout:   () => api.post('/auth/logout'),
  me:       () => api.get('/auth/me'),
};

export const contactService = {
  send: d => api.post('/contact', d),
};

export default api;