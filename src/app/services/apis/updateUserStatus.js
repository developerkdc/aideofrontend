import axios from "axios";

export const updateUserStatus = async (id, status) => {
  try {
    // console.log(status)
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.put("/api/v1/admin/user/status", { id, status }, config);
    return data
  } catch (error) {
    return error;
  }
};
