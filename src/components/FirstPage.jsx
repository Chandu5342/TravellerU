import BottomNavbar from './BottomNavbar'
import Sidebar from './Sidebar.jsx'
import ProjectCard from './ProjectCard'
import TopNavbar from './TopNavbar'
import Portfolio from './Portfolio.jsx'
function FirstPage() {
  return (
    <>
   <div className="container-fluid">
      <div className="row g-0">
        <Sidebar />
        <div className="col-md-10 main-content">
          <TopNavbar />
          <Portfolio />
        </div>
      </div>
      <BottomNavbar />
    </div>
    </>
  )
}
export default FirstPage