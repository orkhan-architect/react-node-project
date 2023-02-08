import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const fetchCinemas = (page) =>API.get(`/cinemas?page=${page}`);
export const createCinema = (newCinema) => API.post('/cinemas', newCinema);
export const updateCinema = (id, updatedCinema) => API.patch(`/cinemas/${id}`, updatedCinema);
export const deleteCinema = (id) => API.delete(`/cinemas/${id}`);

export const likeCinema = (id) => API.patch(`/cinemas/${id}/likeCinema`);
export const fetchCinemasBySearch = (searchQuery) => API.get(`/cinemas/search?searchQuery=${searchQuery.search || 'none'}`);
export const fetchCinema = (id) => API.get(`/cinemas/${id}`);
export const comment = (value, id) => API.post(`/cinemas/${id}/commentCinema`, { value });

export const logIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/signup', formData);