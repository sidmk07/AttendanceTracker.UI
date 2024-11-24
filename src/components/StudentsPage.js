import React, { useState, useEffect } from "react";
import { fetchStudents } from "../services/api"; // Ensure this is centralized
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import "../styles/StudentsPage.css"; // Custom CSS file for adjustments

const StudentsPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        /**
         * Fetches the list of students from the API and stores them in the component
         * state. If the API call fails, logs an error message to the console.
         */
        const fetchData = async () => {
            try {
                const response = await fetchStudents();
                setStudents(response); // Assuming response is an array of student objects
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchData();
    }, []);

    /**
     * Exports the list of students to an Excel file named "StudentsList.xlsx" and
     * saves it to the user's computer.
     */
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(students);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        XLSX.writeFile(workbook, "StudentsList.xlsx");
    };

    return (
        <div className="students-page container">
            <h2 className="text-center my-4">Students Attendance List</h2>
            <div className="row">
                {students.map((student) => (
                    <div key={student.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <img
                                    src={student.photo || "default-avatar.jpg"}
                                    alt={student.name}
                                    className="rounded-circle student-avatar"
                                />
                                <h5 className="card-title mt-3">{student.name}</h5>
                                <p className="text-muted">{student.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <Button onClick={exportToExcel} className="btn btn-primary">
                    Export List
                </Button>
            </div>
        </div>
    );
};

export default StudentsPage;
