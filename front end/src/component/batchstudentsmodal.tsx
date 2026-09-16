import { useEffect, useState } from "react";
import { getBatchStudents } from "../actionpages/getBatchStudents.action";
import type { User } from "../types/usertype";
// import "../stylesheet/showusers.css";
import "../stylesheet/batchstudentmodal.css";

interface Props {
  batchId: string;
  batchName: string;
  onClose: () => void;
}

export default function BatchStudentsModal({
  batchId,
  batchName,
  onClose,
}: Props) {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getBatchStudents(batchId);

        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [batchId]);

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>{batchName}</h2>

        {loading ? (
          <h3>Loading...</h3>
        ) : students.length === 0 ? (
          <p>No students enrolled.</p>
        ) : (
        <table className="students-table">
  <thead>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>

  <tbody>
    {students.map((student) => (
      <tr key={student._id}>
        <td>
          <img
            // src={`http://localhost:3000${student.profileImage}`}
             src={`http://localhost:31156${student.profileImage}`}
            alt={student.name}
            className="student-image"
          />
        </td>

        <td>{student.name}</td>

        <td>{student.email}</td>

        <td>{student.role}</td>
      </tr>
    ))}
  </tbody>
</table>  
        
        )}

        <button
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}