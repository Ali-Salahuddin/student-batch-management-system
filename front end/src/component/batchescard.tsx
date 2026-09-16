import type { Batch } from "../types/batchtype";

interface BatchCardProps {
  batch: Batch;
}

function BatchCard({
  batch,
}: BatchCardProps) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
      }}
    >
      <h2>{batch.courseName}</h2>

      <p>
        <strong>Instructor:</strong>{" "}
        {batch.instructor}
      </p>

      <p>
        <strong>Batch Code:</strong>{" "}
        {batch.batchCode}
      </p>

      <p>
        <strong>Timing:</strong>{" "}
        {batch.timing}
      </p>

      <p>
        <strong>Fee:</strong> Rs.
        {batch.fee}
      </p>

      <p>
        <strong>Students:</strong>{" "}
        {batch.enrolledStudents}
      </p>

      <p>
        <strong>Mode:</strong>{" "}
        {batch.mode}
      </p>
    </div>
  );
}

export default BatchCard;