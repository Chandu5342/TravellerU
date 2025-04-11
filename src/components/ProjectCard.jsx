const ProjectCard = ({ id, title, description, author, language, image, isSaved, onSave }) => (
  <div className="col-12 col-md-10 col-lg-8">
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid" alt="project image" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted small">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">{language} · Oleh {author}</small>
            </p>
            {isSaved ? (
              <button className="btn btn-secondary btn-sm float-end" disabled>Saved</button>
            ) : (
              <button className="btn btn-warning btn-sm float-end" onClick={() => onSave(id)}>Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
