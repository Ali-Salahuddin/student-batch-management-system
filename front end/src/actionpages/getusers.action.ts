import api from "../api/api";
export const getUsers = async () => {
  try {
    // const response = await fetch("http://localhost:31156/auth/users", {
    //   method: "GET",
    //   credentials: "include",
    const response = await api.get("/auth/users");
    // });

    // const data = await response.json();
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};