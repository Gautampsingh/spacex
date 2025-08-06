import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";
import "./Navigation.css";

const Navigation = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger toggle
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Toggle dropdown on click for mobile (instead of hover)
  const toggleExplore = () => setExploreOpen(!exploreOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close dropdowns and menu when navigating
  const handleNavClick = () => {
    setMenuOpen(false);
    setExploreOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <NavLink to="/dashboard"  onClick={handleNavClick}>
          SpaceX Energy
        </NavLink>
      </div>

      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </button>

      <div className={`nav-menus ${menuOpen ? "open" : ""}`}>
        <NavLink to="/dashboard" className="nav-link" onClick={handleNavClick}>
          Dashboard
        </NavLink>

        <div
          className="nav-group"
          onClick={toggleExplore}
          onMouseEnter={() => window.innerWidth > 768 && setExploreOpen(true)}
          onMouseLeave={() => window.innerWidth > 768 && setExploreOpen(false)}
        >
          <span className={`nav-link${exploreOpen ? " active" : ""}`}>
            Explore ▼
          </span>
          {exploreOpen && (
            <div className="dropdown">
              <NavLink to="/launches" className="dropdown-link" onClick={handleNavClick}>
                Launches
              </NavLink>
              <NavLink to="/energy" className="dropdown-link" onClick={handleNavClick}>
                Energy Information
              </NavLink>
            </div>
          )}
        </div>

        <div
          className="nav-group"
          onClick={toggleProfile}
          onMouseEnter={() => window.innerWidth > 768 && setProfileOpen(true)}
          onMouseLeave={() => window.innerWidth > 768 && setProfileOpen(false)}
        >
          <span className="nav-link custom-profile">{user.username} ▼</span>
          {profileOpen && (
            <div className="dropdown">
              <span
                className="dropdown-link"
                onClick={() => {
                  logout();
                  navigate("/");
                  handleNavClick();
                }}
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
