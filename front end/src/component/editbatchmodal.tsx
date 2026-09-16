import { useEffect, useState } from "react";
import type { Batch } from "../types/batchtype";
import "../stylesheet/showbatchstlye.css";
import { updateBatch } from "../actionpages/updatebatch.action";
interface Props {
    batch: Batch | null;
    onClose: () => void;
    onSave: () => void;
}

function EditBatchModal({
  batch,
  onClose,
  onSave,
}: Props) {

  const [formData, setFormData] =
    useState<Batch | null>(null);

  useEffect(() => {
    if (batch) {
      setFormData(batch);
    }
  }, [batch]);
  const handleDayChange = (day: number) => {
  if (!formData) return;

  if (formData.classDays.includes(day)) {
    setFormData({
      ...formData,
      classDays: formData.classDays.filter(
        (d) => d !== day
      ),
    });
  } else {
    setFormData({
      ...formData,
      classDays: [
        ...formData.classDays,
        day,
      ],
    });
  }
};

  if (!batch || !formData)
    return null;
  const handleSave = async () => {
  if (!formData) return;

  try {
    const result = await updateBatch(
      formData._id,
      formData
    );

    alert(result.message);

    onSave();   // Refresh batches
    onClose();  // Close modal
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Failed to update batch."
    );
  }
};
// const handleSave = async () => {
//   if (!formData) return;

//   const result = await updateBatch(
//     formData._id,
//     formData
//   );

//   if (result.success) {
//     alert(result.message);

//     onSave();   // refresh batches

//     onClose();  // close modal
//   } else {
//     alert(result.message);
//   }
// };
  return (
  <div className="modal-overlay">
    <div className="modal">

      <h2>Edit Batch</h2>

      <div className="form-grid">

        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            value={formData.courseName}
            onChange={(e) =>
              setFormData({
                ...formData,
                courseName: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Instructor</label>
          <input
            type="text"
            value={formData.instructor}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructor: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Batch Code</label>
          <input
            type="text"
            value={formData.batchCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                batchCode: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Timing</label>
          <input
            type="text"
            value={formData.timing}
            onChange={(e) =>
              setFormData({
                ...formData,
                timing: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Classes Per Week</label>
          <input
            type="number"
            value={formData.classesPerWeek}
            onChange={(e) =>
              setFormData({
                ...formData,
                classesPerWeek: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Duration (Months)</label>
          <input
            type="number"
            value={formData.durationMonths}
            onChange={(e) =>
              setFormData({
                ...formData,
                durationMonths: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={formData.startDate.split("T")[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                startDate: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Fee</label>
          <input
            type="number"
            value={formData.fee}
            onChange={(e) =>
              setFormData({
                ...formData,
                fee: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label> Students Enrolled</label>
          <input
            type="number"
            value={formData.enrolledStudents}
            onChange={(e) =>
              setFormData({
                ...formData,
                enrolledStudents: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Mode</label>
          <select
            value={formData.mode}
            onChange={(e) =>
              setFormData({
                ...formData,
                mode: e.target.value,
              })
            }
          >
            <option value="Online">Online</option>
            <option value="Physical">Physical</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

      </div>

      <div className="class-days-section">
        <h3>Class Days</h3>

        <div className="days-container">

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(1)}
              onChange={() => handleDayChange(1)}
            />
            Monday
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(2)}
              onChange={() => handleDayChange(2)}
            />
            Tuesday
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(3)}
              onChange={() => handleDayChange(3)}
            />
            Wednesday
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(4)}
              onChange={() => handleDayChange(4)}
            />
            Thursday
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(5)}
              onChange={() => handleDayChange(5)}
            />
            Friday
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(6)}
              onChange={() => handleDayChange(6)}
            />
            Saturday
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.classDays.includes(7)}
              onChange={() => handleDayChange(7)}
            />
            Sunday
          </label>

        </div>
      </div>

      <div className="modal-buttons">
        <button className="edit-btn" 
        onClick={handleSave}>
          Save Changes
        </button>

        <button
          className="delete-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>

    </div>
  </div>
);}

export default EditBatchModal;