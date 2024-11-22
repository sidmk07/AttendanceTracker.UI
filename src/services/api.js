import axios from "axios";

const API_BASE_URL = "http://localhost:5190"; //7079

export const login = (email, password) => {
    return axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
};

export const fetchAttendance = () => {
    return axios.get(`${API_BASE_URL}/api/attendance`);
};

export const markAttendance = (attendance) => {
    return axios.post(`${API_BASE_URL}/api/attendance`, attendance);
};
