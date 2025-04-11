import axios from 'axios';

const API_URL = 'https://travellerback-a2js.onrender.com';


export const fetchProjects = async () => {
  const res = await axios.get(`${API_URL}/projects`);
  return res.data;
};

export const addProject = async (project) => {
  const res = await axios.post(`${API_URL}/projects`, project);
  return res.data;
};

export const fetchSavedProjectIds = async () => {
    const res = await axios.get('http://localhost:5000/projects/saved');
    return res.data;
  };

export const saveProjectToDB = async (projectId) => {
  const res = await axios.post(`${API_URL}/projects/${projectId}/save`);
  return res.data;
};
export const unsaveProjectFromDB = async (projectId) => {
  const res = await axios.delete(`${API_URL}/projects/${projectId}/unsave`);
  return res.data;
};
export const deleteProjectFromDB = async (projectId) => {
  const res = await axios.delete(`${API_URL}/projects/${projectId}`);
  return res.data;
};