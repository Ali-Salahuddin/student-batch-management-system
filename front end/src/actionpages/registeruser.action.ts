import api from "../api/api";
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const registerUser = async (formData: FormData) => {
  try {
    // const response = await fetch("http://localhost:3000/auth/register", {
    //   method: "POST",
    // //   headers: {
    // //     "Content-Type": "application/json",
    // //   },
    //   credentials: "include",
    // //   body: JSON.stringify(user),
    // body: formData,
    // });
    const response = await api.post("/auth/register", formData);

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