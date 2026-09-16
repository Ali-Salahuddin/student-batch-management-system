import { useState } from "react";
import { updateUser } from "../actionpages/updateuser.action";
import "../stylesheet/showusers.css";
import { getBatches } from "../actionpages/getbatches.action";
import { useEffect } from "react";
import type { User } from "../types/usertype";
import type { Batch } from "../types/usertype";
// interface Batch {
//   _id: string;
//   courseName: string;
//   batchCode: string;
// }

interface Props {
  user: User;
  onClose: () => void;
  onUpdated: (user: User) => void;
}

export default function EditUserModal({
  user,
  onClose,
  onUpdated,
}: Props) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
     password: "",
      batch: user.batch?._id || "",
  });

  const [image, setImage] = useState<File | null>(null);
  //const [preview, setPreview] = useState("");
  const [preview, setPreview] = useState(
  user.profileImage
    ? `http://localhost:31156${user.profileImage}`
    : "/default-avatar.png"
);
  const [confirmPassword, setConfirmPassword] =useState("");
  const [batches, setBatches] = useState<Batch[]>([]);

  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "role" && value !== "student"
      ? { batch: "" }
      : {}),
  }));
};
  useEffect(() => {
  const loadBatches = async () => {
    try {
      // const response = await getBatches();
      const batches = await getBatches();
      setBatches(batches);
    //  setBatches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  loadBatches();
}, []);

  const handleImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files?.length) return;

  const file = e.target.files[0];

  // Allow only JPEG and PNG
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
};
  const saveChanges = async () => {
    try {
      const formData = new FormData();

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("role", form.role);
        if (form.password.trim() !== "") {
        formData.append("password", form.password);
        }
         if (form.role === "student") {
    formData.append("batch", form.batch);
    } else {
    formData.append("batch", "");
    }
      if (image) {
        formData.append("profileImage", image);
      }
     if (form.password.trim() !== "") {
    if (form.password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
}
      const updated = await updateUser(
        user._id,
        formData
      );
      console.log(updated);
      onUpdated(updated);

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit User</h2>
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

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="admin">
            Admin
          </option>

          <option value="teacher">
            Teacher
          </option>

          <option value="student">
            Student
          </option>
        </select>
        {form.role === "student" && (
  <select
    name="batch"
    value={form.batch}
    onChange={handleChange}
  >
    <option value="">
      Select Batch
    </option>

    {batches.map((batch) => (
      <option
        key={batch._id}
        value={batch._id}
      >
        {batch.courseName} ({batch.batchCode})
      </option>
    ))}
  </select>
)}
        <input
                type="password"
                name="password"
                placeholder="Leave blank to keep current password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }/>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        <div className="buttons">
          <button onClick={saveChanges}>
            Save
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}