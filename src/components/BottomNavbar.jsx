function BottomNavbar()
{
    return(
        <>
    
  <nav className="navbar fixed-bottom navbar-light bg-white border-top d-md-none d-flex justify-content-around">
    <a className="text-center text-decoration-none text-muted" href="#"><i className="bi bi-house fs-5"></i><br /><small>Dashboard</small></a>
    <a className="text-center text-decoration-none text-danger" href="#"><i className="bi bi-folder2-open fs-5"></i><br /><small>Portfolio</small></a>
    <a className="text-center text-decoration-none text-muted" href="#"><i className="bi bi-ui-checks-grid fs-5"></i><br /><small>Inputs</small></a>
    <a className="text-center text-decoration-none text-muted" href="#"><i className="bi bi-person fs-5"></i><br /><small>Profile</small></a>
  </nav>


        </>
    )
}
export default BottomNavbar