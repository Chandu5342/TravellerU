import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import {
  fetchProjects,
  addProject,
  fetchSavedProjectIds,
  saveProjectToDB,
  unsaveProjectFromDB,
  deleteProjectFromDB
} from '../services/projectService';


const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('Project');

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    author: '',
    language: '',
    image: '',
  });

  useEffect(() => {
    getProjects();
    getSavedProjects(); 
  }, []);
  

  const getProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const getSavedProjects = async () => {
    try {
      const ids = await fetchSavedProjectIds();
      console.log("✅ Saved project IDs from backend:", ids); // 👈 Add this
      setSavedProjects(ids);
    } catch (err) {
      console.error('❌ Failed to fetch saved projects:', err);
    }
  };
  

  const handleSave = async (projectId) => {
    try {
      if (savedProjects.includes(projectId)) {
        // 🔁 Unsave project
        await unsaveProjectFromDB(projectId);
        setSavedProjects((prev) => prev.filter((id) => id !== projectId));
      } else {
        // ✅ Save project
        await saveProjectToDB(projectId);
        setSavedProjects((prev) => [...prev, projectId]);
  
        setProjects((prev) => {
          const projectToMove = prev.find((p) => p.id === projectId);
          const remaining = prev.filter((p) => p.id !== projectId);
          return [...remaining, projectToMove];
        });
      }
    } catch (err) {
      console.error('Save/Unsave failed:', err);
    }
  };

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const { title, description, author, language, image } = newProject;
    const newEntry = {
      title,
      description,
      author,
      language,
      image: image || "https://via.placeholder.com/300x200",
      category: "Project"
    };

    try {
      const created = await addProject(newEntry);
      setProjects((prev) => [created, ...prev]);
      setNewProject({ title: '', description: '', author: '', language: '', image: '' });

      const modalEl = document.getElementById('addProjectModal');
      let modal = bootstrap.Modal.getInstance(modalEl);
      if (!modal) modal = new bootstrap.Modal(modalEl);
      modal.hide();

      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };
  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
  
    try {
      await deleteProjectFromDB(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setSavedProjects((prev) => prev.filter((id) => id !== projectId));
    } catch (err) {
      console.error('❌ Failed to delete project:', err);
    }
  };
  const filteredProjects = (() => {
    const matchesSearch = (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "Saved") {
      return savedProjects
        .map((savedId) => projects.find((p) => p.id === savedId))
        .filter((project) => project && matchesSearch(project));
    } else {
      return projects.filter(
        (project) =>
          project.category === selectedTab && matchesSearch(project)
      );
    }
  })();

  return (
    <div className="portfolio-section p-4">
      <div className="portfolio-header d-flex justify-content-between align-items-center mb-3">
        <h4>Portfolio</h4>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search project"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            + Add Project
          </button>
        </div>
      </div>

      <ul className="nav nav-tabs mb-3">
        {["Project", "Saved", "Achievement"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div className="portfolio-scroll">
        <div className="row g-4 justify-content-center">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              author={project.author}
              language={project.language}
              image={project.image}
              isSaved={savedProjects.includes(project.id)}
              onSave={handleSave}
              onDelete={handleDelete}
            />
            
            ))
          ) : (
            <p className="text-center text-muted">No {selectedTab.toLowerCase()} projects found.</p>
          )}
        </div>
      </div>

      {/* 🔥 Modal */}
      <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content needs-validation" onSubmit={handleAddProject} noValidate>
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">Add New Project</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <input type="text" className="form-control" name="title" placeholder="Title" value={newProject.title} onChange={handleNewProjectChange} required />
                <div className="invalid-feedback">Title is required.</div>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" name="author" placeholder="Author" value={newProject.author} onChange={handleNewProjectChange} required />
                <div className="invalid-feedback">Author is required.</div>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" name="language" placeholder="Language" value={newProject.language} onChange={handleNewProjectChange} />
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" name="image" placeholder="Image URL (optional)" value={newProject.image} onChange={handleNewProjectChange} />
              </div>
              <div className="mb-2">
                <textarea className="form-control" name="description" rows="2" placeholder="Description" value={newProject.description} onChange={handleNewProjectChange} required></textarea>
                <div className="invalid-feedback">Description is required.</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Add Project</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
