import axios from "axios";

const handleMarkAttendance = async () => {
  try {
    const response = await axios.post("http://localhost:5190/api/attendance", {
      studentId,
      date,
      status,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
