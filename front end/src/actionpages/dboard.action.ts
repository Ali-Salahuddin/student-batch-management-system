// 
import api from "../api/api";

export interface DashboardData {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalAdmins: number;
  totalBatches: number;
}

export const getDashboard = async (): Promise<DashboardData> => {

  const response = await api.get("/dboard/dashboard");

  console.log("FULL DASHBOARD RESPONSE:", response);
  console.log("DASHBOARD DATA:", response.data);

  return response.data.data;
};