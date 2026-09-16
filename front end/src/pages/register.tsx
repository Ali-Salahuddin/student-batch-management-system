import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actionpages/registeruser.action";
import Navbar from "../component/navibar";
import "../stylesheet/showusers.css";
const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [image, setImage] = useState<File | null>(null);
const [preview, setPreview] = useState("");
  

const handleImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPEG and PNG images are allowed.");
    e.target.value = "";
    return;
  }

  // Maximum size: 2 MB
  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    alert("Image size must be be less than 2 MB.");
    e.target.value = "";
    return;
  }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  }
};
  const handleSubmit = async (e: any) => {
  e.preventDefault();


    try {
      // await registerUser(user);
      
        const formData = new FormData();

formData.append("name", user.name);
formData.append("email", user.email);
formData.append("password", user.password);
formData.append("role", user.role);

if (image) {
  formData.append("profileImage", image);
}

await registerUser(formData);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
    <Navbar />
    <div>
      <h2>Register</h2>
      <div className="image-preview">
  <img
    src={
      preview
        ? preview
        : "/default-avatar.png"
    }
    alt="Profile"
    className="preview-image"
  />
</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter Name"
          required
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
       <select
  name="role"
  value={user.role}
  onChange={handleChange}
  required
>
  <option value="">Select Role</option>
  <option value="admin">Admin</option>
  <option value="teacher">Teacher</option>
  <option value="student">Student</option>
</select>
<input
  type="file"
  name="profileImage"
  accept="image/*"
  onChange={handleImage}
/>

        <button type="submit">Register</button>
      </form>
    </div></>
  );
};

export default Register;