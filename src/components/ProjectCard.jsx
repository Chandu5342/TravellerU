const ProjectCard = ({ id, title, description, author, language, image, isSaved, onSave ,onDelete }) => (
  <div className="col-12 col-md-10 col-lg-8">
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid" alt="project" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted small">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">{language} · Oleh {author}</small>
            </p>

            <button
              className={`btn btn-sm ${isSaved ? 'btn-secondary' : 'btn-warning'}`}
              onClick={() => onSave(id)}
            >
              {isSaved ? 'Unsave' : 'Add to Cart'}
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export  default ProjectCard