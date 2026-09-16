export const deleteBatch = async (
  id: string
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/batches/${id}`,
      `http://localhost:31156/batches/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};