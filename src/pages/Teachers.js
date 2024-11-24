import React, { useEffect, useState } from "react";
import api from "../services/api";

/**
 * A React component that fetches and displays a list of teachers.
 * 
 * This component uses the useEffect hook to fetch teacher data from the API
 * when the component mounts. The fetched data is stored in the `teachers` state
 * and displayed as a list.
 */
const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        /**
         * Fetches the list of teachers from the API and stores them in the component
         * state.
         * 
         * If the API call fails, logs an error message to the console.
         */
        const fetchTeachers = async () => {
            try {
                const response = await api.get("/Teachers");
                setTeachers(response.data);
            } catch (err) {
                console.error("Error fetching teachers:", err);
            }
        };
        fetchTeachers();
    }, []);

    return (
        <div>
            <h1>Teachers</h1>
            <ul>
                {teachers.map((teacher) => (
                    <li key={teacher.id}>{teacher.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Teachers;
