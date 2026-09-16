import api from "../api/api";
export const updateUser = async (
    id: string,
    formData: FormData
) => {

    // const response = await fetch(
    //     `http://localhost:3000/auth/users/${id}`,
    //     {
    //         method: "PATCH",
    //         credentials: "include",
    //         body: formData,
    //     }
    // );
    const response = await api.patch(
  `/auth/users/${id}`,
  formData
);

    // const data = await response.json();
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
    }

    return data.data;
};