import axios from 'axios';

const API_URL = 'https://travellerback-a2js.onrender.com';

export const fetchProjects = async () => {
  try {
    const res = await axios.get(`${API_URL}/projects`);
    return res.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw new Error('Failed to fetch projects');
  }
};

export const addProject = async (project) => {
  try {
    const res = await axios.post(`${API_URL}/projects`, project);
    return res.data;
  } catch (err) {
    console.error("Error adding project:", err);
    throw new Error('Failed to add project');
  }
};

export const fetchSavedProjectIds = async () => {
  try {
    const res = await axios.get(`${API_URL}/projects/saved`);
    return res.data;
  } catch (err) {
    console.error("Error fetching saved project IDs:", err);
    throw new Error('Failed to fetch saved projects');
  }
};

export const saveProjectToDB = async (projectId) => {
  try {
    const res = await axios.post(`${API_URL}/projects/${projectId}/save`);
    return res.data;
  } catch (err) {
    console.error("Error saving project:", err);
    throw new Error('Failed to save project');
  }
};

export const unsaveProjectFromDB = async (projectId) => {
  try {
    const res = await axios.delete(`${API_URL}/projects/${projectId}/unsave`);
    return res.data;
  } catch (err) {
    console.error("Error unsaving project:", err);
    throw new Error('Failed to unsave project');
  }
};

export const deleteProjectFromDB = async (projectId) => {
  try {
    const res = await axios.delete(`${API_URL}/projects/${projectId}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting project:", err);
    throw new Error('Failed to delete project');
  }
};
