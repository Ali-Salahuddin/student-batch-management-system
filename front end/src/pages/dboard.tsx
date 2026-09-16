import { useEffect, useState } from "react";
import Navbar from "../component/navibar";
import { getDashboard } from "../actionpages/dboard.action";
import "../stylesheet/dashboard.css";
import type { DashboardData } from "../types/dboarddatatype";

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardData>({
      totalUsers: 0,
      totalStudents: 0,
      totalTeachers: 0,
      totalAdmins: 0,
      totalBatches: 0,
    });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        console.log("DASHBOARD DATA:", data);
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          📊 Dashboard
        </h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>👥 Users</h3>
            <h1>{stats.totalUsers}</h1>
          </div>

          <div className="dashboard-card">
            <h3>🎓 Students</h3>
            <h1>{stats.totalStudents}</h1>
          </div>

          <div className="dashboard-card">
            <h3>👨‍🏫 Teachers</h3>
            <h1>{stats.totalTeachers}</h1>
          </div>
            <div className="dashboard-card">
                    <h3>👑 Admins</h3>
                    <h1>{stats.totalAdmins}</h1>
                    </div>
          <div className="dashboard-card">
            <h3>📚 Batches</h3>
            <h1>{stats.totalBatches}</h1>
          </div>

        </div>

      </div>
    </>
  );
}