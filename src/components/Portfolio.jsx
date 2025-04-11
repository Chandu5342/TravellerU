import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

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

  const getProjects = () => {
    const dummyProjects = [
      { id: 1, title: "Kemampuan Merangkum Tulisan", description: "Lorem ipsum dolor sit amet consectetur. Nulla risus malesuada at duis...", author: "Ravi Kumar", language: "Bahasa Sunda", image: "https://via.placeholder.com/300x200", category: "Project" },
      { id: 2, title: "Exploring Bali Together", description: "Trip experience to Bali with friends and solo travelers!", author: "Sita Devi", language: "Bahasa Indonesia", image: "https://via.placeholder.com/300x200", category: "Project" },
      { id: 3, title: "Mountain Escape: Manali Trek", description: "A peaceful 3-day journey to Manali hills...", author: "Amit Raj", language: "English", image: "https://via.placeholder.com/300x200", category: "Project" },
      { id: 4, title: "Achievement: 1000+ Downloads", description: "One of the most downloaded writing guides from our platform.", author: "Sudha Rani", language: "Hindi", image: "https://via.placeholder.com/300x200", category: "Achievement" },
      { id: 5, title: "My React Project", description: "A clean and responsive portfolio made in React.", author: "Sudheeshna", language: "English", image: "https://via.placeholder.com/300x200", category: "Project" }
    ];
    setProjects(dummyProjects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleSave = (projectId) => {
    if (!savedProjects.includes(projectId)) {
      setSavedProjects([...savedProjects, projectId]);
      setProjects((prevProjects) => {
        const projectToMove = prevProjects.find((p) => p.id === projectId);
        const remainingProjects = prevProjects.filter((p) => p.id !== projectId);
        return [...remainingProjects, projectToMove];
      });
    }
  };

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const { title, description, author, language, image } = newProject;
    const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newEntry = {
      id: newId,
      title,
      description,
      author,
      language,
      image: image || "https://via.placeholder.com/300x200",
      category: "Project"
    };

    setProjects([newEntry, ...projects]);
    setNewProject({ title: '', description: '', author: '', language: '', image: '' });

    // ✅ Close modal safely
    const modalEl = document.getElementById('addProjectModal');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) modal = new bootstrap.Modal(modalEl);
    modal.hide();

    // ✅ Remove backdrop manually
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
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
