import React, { useEffect, useState } from "react";
import api from "../services/api";

/**
 * A React component that displays a list of students.
 *
 * On mount, fetches a list of students from the server and stores them in
 * component state. If the request fails, logs an error to the console.
 *
 * @return {JSX.Element} A JSX element containing a list of students.
 */
const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        /**
         * Fetches a list of students from the server.
         *
         * Makes an API GET request to the "/students" endpoint. On success, updates
         * the component state with the retrieved student data. Logs an error to the
         * console if the request fails.
         */
        const fetchStudents = async () => {
            try {
                const response = await api.get("/Students");
                setStudents(response.data);
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Students;
