import { useEffect, useState } from "react";
import { getBatches } from "../actionpages/getbatches.action";
import type { Batch } from "../types/batchtype";
import "../stylesheet/showbatchstlye.css";
import { deleteBatch } from "../actionpages/deletebatch.action";
import EditBatchModal from "../component/editbatchmodal";
// import { getBatchStudents } from "../actionpages/getBatchStudents.action";
// import BatchCard from "../component/batchescard";
// import { useNavigate } from "react-router-dom";
import Navbar from "../component/navibar";
import BatchStudentsModal from "../component/batchstudentsmodal";

function showBatches() {
  // const navigate = useNavigate();
  
  const [batches, setBatches] =
    useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] 
  = useState<Batch | null>(null);
  const [studentBatch, setStudentBatch] =
    useState<Batch | null>(null);

//   const fetchData = async () => {
//   const result = await getBatches();

//   console.log(result);

//   if (result.success) {
//     setBatches(result.batches);
//   } else {
//     if (result.status === 403) {
//       alert("Unauthorized! Only admin can view batches.");
//     }
//   }
// };
const fetchData = async () => {
  try {
    const batches = await getBatches();

    console.log(batches);

    setBatches(batches);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch batches.");
  }
};

    useEffect(() => {
  fetchData();
}, []);

async function handleDelete(id: string): Promise<void> {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this batch?"
  );

  if (!confirmDelete) return;

  try {
    const result = await deleteBatch(id);

    alert(result.message);

    setBatches((prev) =>
      prev.filter((batch) => batch._id !== id)
    );
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Failed to delete batch."
    );
  }
}
  // async function handleDelete(id: string): Promise<void> {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this batch?"
  //   );

  //   if (!confirmDelete) return;

  //   const result = await deleteBatch(id);

  //   if (result.success) {
  //     alert(result.message);
  //     setBatches((prev) => prev.filter((batch) => batch._id !== id));
  //   } else {
  //     alert(result.message);
  //   }
  // }
console.log("State batches:", batches);
   return (
    <>
     <Navbar />
  <div className="show-batches-container">
    
   <h1 className="page-title">
  📚 All Batches
</h1>
<div className="batch-table-container">
   <table className="batch-table">
      <thead>
        <tr>
          <th>Course</th>
          <th>Instructor</th>
          <th>Batch Code</th>
          <th>Timing</th>
          <th>Enrolled Students</th>
          <th>Fee</th>
          <th>Mode</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {batches.map((batch) => (
          
          <tr key={batch._id}>
            <td
 
>{batch.courseName}</td>
            <td
 
>{batch.instructor}</td>
            <td
 
>{batch.batchCode}</td>
            <td
 
>{batch.timing}</td>
<td>{batch.enrolledStudents}</td>

<td>{batch.fee}</td>
<td>{batch.mode}</td>
<td><div className="actions">
    <button className="edit-btn" 
            onClick={() => setSelectedBatch(batch)}>
               ✏ Edit 
    </button>
               
               {" "}

              <button className="delete-btn"
             onClick={() => handleDelete(batch._id)}>
                        🗑 Delete
            </button>
      <button
                className="view-btn"
                onClick={() =>
                    setStudentBatch(batch)
                }
            >
    👥 Students
              </button>
             
   </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table></div>
  </div>
  <EditBatchModal 
  batch={selectedBatch} 
  onClose={() => setSelectedBatch(null) }
   onSave={fetchData}
  />
  {studentBatch && (
  <BatchStudentsModal
    batchId={studentBatch._id}
    batchName={studentBatch.courseName}
    onClose={() =>
      setStudentBatch(null)
    }
  />
)}
  
</>);}

export default showBatches;