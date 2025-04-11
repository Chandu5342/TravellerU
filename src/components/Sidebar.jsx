import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="col-md-2 sidebar d-none d-md-flex flex-column align-items-center py-4">
    <h4 className="mb-4">LOGO</h4>
    <nav className="nav flex-column w-100 px-3">
      <NavLink to="/" className="nav-link mb-2">
        <i className="bi bi-speedometer2 me-2"></i> Dashboard
      </NavLink>
      <NavLink to="/portfolio" className="nav-link mb-2">
        <i className="bi bi-folder2-open me-2"></i> Portfolio
      </NavLink>
      <NavLink to="/inputs" className="nav-link mb-2">
        <i className="bi bi-ui-checks-grid me-2"></i> Inputs
      </NavLink>
      <NavLink to="/profile" className="nav-link mb-2">
        <i className="bi bi-person me-2"></i> Profile
      </NavLink>
    </nav>
  </div>
);

export default Sidebar;
