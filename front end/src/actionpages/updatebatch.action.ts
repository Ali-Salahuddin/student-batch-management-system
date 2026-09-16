import type { BatchData } from "../types/batchtype";
import api from "../api/api";
export const updateBatch = async (
  id: string,
  batch: BatchData
) => {
  try {
    // const token = localStorage.getItem("token");

    // const response = await fetch(
    //   `http://localhost:3000/batches/${id}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(batch),
    //   }
    // );
    const response = await api.patch(
    `/batches/${id}`,
    batch
  );

    // const data = await response.json();
  const data = response.data;
    return {
       success: response.status >= 200 && response.status < 300,
      message: data.message,
      batch: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
      batch: null,
    };
  }
};