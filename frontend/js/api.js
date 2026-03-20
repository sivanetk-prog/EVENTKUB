const BASE_URL = 'http://localhost:8000'

const api = {
  users: {
    getAll: () => axios.get(`${BASE_URL}/users`),
    getById: (id) => axios.get(`${BASE_URL}/users/${id}`),
    create: (data) => axios.post(`${BASE_URL}/users`, data),
    update: (id, data) => axios.put(`${BASE_URL}/users/${id}`, data),
    remove: (id) => axios.delete(`${BASE_URL}/users/${id}`)
  },
  events: {
    getAll: () => axios.get(`${BASE_URL}/events`),
    getById: (id) => axios.get(`${BASE_URL}/events/${id}`),
    create: (data) => axios.post(`${BASE_URL}/events`, data),
    update: (id, data) => axios.put(`${BASE_URL}/events/${id}`, data),
    remove: (id) => axios.delete(`${BASE_URL}/events/${id}`)
  },
  registrations: {
    getAll: () => axios.get(`${BASE_URL}/registrations`),
    getById: (id) => axios.get(`${BASE_URL}/registrations/${id}`),
    create: (data) => axios.post(`${BASE_URL}/registrations`, data),
    remove: (id) => axios.delete(`${BASE_URL}/registrations/${id}`)
  }
}
