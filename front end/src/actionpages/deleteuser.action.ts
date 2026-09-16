import api from "../api/api";
export const deleteUser = async (id: string) => {
  // const response = await fetch(
  //   // `http://localhost:3000/auth/users/${id}`,
  //   `http://localhost:31156/auth/users/${id}`,
  //   {
  //     method: "DELETE",
  //     credentials: "include",
  //   }
  // );
  const response = await api.delete(`/auth/users/${id}`);

  // const data = await response.json();
  const data = response.data;
  if (response.status < 200 || response.status >= 300) {
    throw new Error(data.message);
  }

  return data;
};