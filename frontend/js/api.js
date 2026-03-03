const BASE_URL = 'http://localhost:8000'

const api = {
  users: {
    getAll: () => axios.get(`${BASE_URL}/users`),
    getById: (id) => axios.get(`${BASE_URL}/users/${id}`),
    create: (data) => axios.post(`${BASE_URL}/users`, data),
    update: (id, data) => axios.put(`${BASE_URL}/users/${id}`, data),
    remove: (id) => axios.delete(`${BASE_URL}/users/${id}`)
  },
  projects: {
    getAll: () => axios.get(`${BASE_URL}/projects`),
    getById: (id) => axios.get(`${BASE_URL}/projects/${id}`),
    create: (data) => axios.post(`${BASE_URL}/projects`, data),
    update: (id, data) => axios.put(`${BASE_URL}/projects/${id}`, data),
    remove: (id) => axios.delete(`${BASE_URL}/projects/${id}`)
  },
  tasks: {
    getAll: () => axios.get(`${BASE_URL}/tasks`),
    getById: (id) => axios.get(`${BASE_URL}/tasks/${id}`),
    create: (data) => axios.post(`${BASE_URL}/tasks`, data),
    update: (id, data) => axios.put(`${BASE_URL}/tasks/${id}`, data),
    remove: (id) => axios.delete(`${BASE_URL}/tasks/${id}`),
    addTag: (id, tagId) => axios.post(`${BASE_URL}/tasks/${id}/tags`, { tag_id: tagId }),
    removeTag: (id, tagId) => axios.delete(`${BASE_URL}/tasks/${id}/tags/${tagId}`)
  },
  tags: {
    getAll: () => axios.get(`${BASE_URL}/tags`),
    create: (name) => axios.post(`${BASE_URL}/tags`, { name })
  }
}
