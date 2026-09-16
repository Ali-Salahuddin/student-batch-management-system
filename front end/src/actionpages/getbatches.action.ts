import api from "../api/api";
export const getBatches = async () => {
  const { data } = await api.get("/batches");
  return data.data;
}