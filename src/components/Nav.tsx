import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">Home</Link>
        <span style={{ margin: "0 10px" }}></span>
  
        <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
      </div>
    </nav>
  );
};

export default Nav;