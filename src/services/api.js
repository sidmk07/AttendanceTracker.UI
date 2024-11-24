import axios from "axios";

// Create an instance of Axios
const api = axios.create({
    baseURL: "http://localhost:5190/api", // Update to match your backend's base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor (optional)
api.interceptors.request.use(
    (config) => {
        // You can add authorization headers or other logic here
        // Example: config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Centralized error handling
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

/**
 * Fetches attendance records from the server.
 *
 * Makes an API GET request to the "/attendance" endpoint. On success, returns
 * the retrieved attendance data. Logs an error to the console and re-throws
 * the error if the request fails.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of attendance
 * records.
 * @throws Will throw an error if the API request fails.
 */
export const fetchAttendance = async () => {
    try {
        const response = await api.get("/Attendance");
        return response.data; // Return the attendance data
    } catch (err) {
        console.error("Error fetching attendance:", err);
        throw err; // Re-throw the error for the calling component to handle
    }
};

/**
 * Fetches the list of students from the server.
 *
 * Makes an API GET request to the "/students" endpoint. On success, returns the
 * retrieved student data. Logs an error to the console and re-throws the error
 * if the request fails.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of student
 * objects. Each object should have the following shape:
 */
export const fetchStudents = async () => {
    try {
        const response = await api.get("/Students"); // Adjust the endpoint as needed
        return response.data;
    } catch (error) {
        console.error("Failed to fetch students:", error);
        throw error;
    }
};

export default api;

