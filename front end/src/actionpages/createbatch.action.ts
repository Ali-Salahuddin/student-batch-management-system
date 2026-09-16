
import type { BatchData } from "../types/batchtype";
export const createBatch = async (
  batchData: BatchData
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // "http://localhost:3000/batches",
      "http://localhost:31156/batches",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(batchData),
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};