import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navibar";
import "../stylesheet/profile.css";
import api from "../api/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
}

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");

        const data = response.data;

        console.log(data);

        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />
        <div className="profile-page">

      <div>
        <h1>Profile</h1>

        {user && (
          <div className="profile-card">
            <div className="profile-image-container">
              <img
                src={`http://localhost:31156${user.profileImage}`}
                alt={user.name}
                className="profile-image"
              />
            </div>

            <h2>{user.name}</h2>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        )}

        <button onClick={() => navigate("/showusers")}>
          View Users
        </button>
      </div></div>
    </>
  );
}

export default Profile;