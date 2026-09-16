import { useState } from "react";
import { createBatch } from "../actionpages/createbatch.action";
import type { BatchData } from "../types/batchtype";
import type { SyntheticEvent } from "react";
import Navbar from "../component/navibar";
import "../stylesheet/createbatch.css";
function CreateBatch() {
    

const [batch, setBatch] =
  useState<BatchData>({
    courseName: "",
    instructor: "",
    batchCode: "",
    timing: "",
    classesPerWeek: 0,
    classDays: [],
    durationMonths: 0,
    startDate: "",
    fee: 0,
    enrolledStudents: 0,
    mode: "",
  });
const handleDayChange = (
  day: number
) => {
  if (batch.classDays.includes(day)) {
    setBatch({
      ...batch,
      classDays: batch.classDays.filter(
        (d) => d !== day
      ),
    });
  } else {
    setBatch({
      ...batch,
      classDays: [
        ...batch.classDays,
        day,
      ],
    });
  }
};
const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  setBatch((prev) => ({
    ...prev,
    [name]:
      e.target.type === "number"
        ? Number(value) : value,
  }));
};
const handleSubmit = async (
  e: SyntheticEvent
) => {
  e.preventDefault();

  const result = await createBatch(batch);
  if (result.success) {
    alert("Batch created successfully");
    console.log(result.data);
  } else {
    alert(result.data.message);
  }
};
return (
  <>
    <Navbar />

    <div className="create-batch-container">
      <h1>Create Batch</h1>

      <form onSubmit={handleSubmit} className="batch-form">

        <div className="form-group">
          <h3>Course Name</h3>
          <input
            type="text"
            name="courseName"
            placeholder="Enter course name"
            value={batch.courseName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Instructor</h3>
          <input
            type="text"
            name="instructor"
            placeholder="Enter instructor name"
            value={batch.instructor}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Batch Code</h3>
          <input
            type="text"
            name="batchCode"
            placeholder="Enter batch code"
            value={batch.batchCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Timing</h3>
          <input
            type="text"
            name="timing"
            placeholder="e.g. 5:00 PM - 7:00 PM"
            value={batch.timing}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Classes Per Week</h3>
          <input
            type="number"
            name="classesPerWeek"
            placeholder="Enter number of classes"
            value={batch.classesPerWeek}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Class Days</h3>

          <div className="days-container">
            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(1)}
                onChange={() => handleDayChange(1)}
              />
              Monday
            </label>

            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(2)}
                onChange={() => handleDayChange(2)}
              />
              Tuesday
            </label>

            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(3)}
                onChange={() => handleDayChange(3)}
              />
              Wednesday
            </label>

            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(4)}
                onChange={() => handleDayChange(4)}
              />
              Thursday
            </label>

            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(5)}
                onChange={() => handleDayChange(5)}
              />
              Friday
            </label>

            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(6)}
                onChange={() => handleDayChange(6)}
              />
              Saturday
            </label>

            <label>
              <input
                type="checkbox"
                checked={batch.classDays.includes(7)}
                onChange={() => handleDayChange(7)}
              />
              Sunday
            </label>
          </div>
        </div>

        <div className="form-group">
          <h3>Duration</h3>
          <input
            type="number"
            name="durationMonths"
            placeholder="Duration in months"
            value={batch.durationMonths}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Start Date</h3>
          <input
            type="date"
            name="startDate"
            value={batch.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Fee</h3>
          <input
            type="number"
            name="fee"
            placeholder="Enter fee"
            value={batch.fee}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Total Students</h3>
          <input
            type="number"
            name="totalStudents"
            placeholder="Enter maximum students"
            value={batch.enrolledStudents}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Mode</h3>

          <select
            name="mode"
            value={batch.mode}
            onChange={handleChange}
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Physical">Physical</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <button type="submit" className="create-button">
          Create Batch
        </button>

      </form>
    </div>
  </>
);

}
export default CreateBatch;
