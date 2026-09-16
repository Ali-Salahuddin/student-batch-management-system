import { useNavigate } from "react-router-dom";
import "../stylesheet/navbar.css";
import { useEffect, useState } from "react";
import api from "../api/api";

interface User {
  _id: string;
  email: string;
  role: string;
}

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");

        const data = response.data;

        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

 const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-content">

        <h2 className="navbar-title">
          Batch Management System
        </h2>

        <div className="navbar-buttons">

          <button
            className="nav-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

          {user?.role === "admin" && (
            <>
              <button
                className="nav-btn"
                onClick={() => navigate("/createbatch")}
              >
                Create Batch
              </button>

              <button
                className="nav-btn"
                onClick={() => navigate("/showbatches")}
              >
                Show Batches
              </button>

              <button
                className="nav-btn"
                onClick={() => navigate("/showusers")}
              >
                View Users
              </button>

              <button
                className="nav-btn"
                onClick={() => navigate("/register")}
              >
                Create User
              </button>
            </>
          )}

          <button
            className="nav-btn logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;