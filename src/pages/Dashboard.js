import React, { useEffect, useState } from "react";
import { fetchAttendance } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadAttendance = async () => {
            try {
                const response = await fetchAttendance();
                setAttendanceRecords(response.data);
            } catch (err) {
                setError("Failed to load attendance records.");
            }
        };

        loadAttendance();
    }, []);

    return (
        <div className="container mt-4">
            <div>
                <button onClick={() => navigate("/students")}>View Students</button>
                <button onClick={() => navigate("/teachers")}>View Teachers</button>
            </div>

            <h1>Dashboard</h1>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map((record, index) => (
                        <tr key={record.id}>
                            <td>{index + 1}</td>
                            <td>{record.studentId}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
