import axios from "axios";

export const deleteUser = async (id) => {
  try {
    const data = await axios.delete(`/api/v1/admin/user/delete/${id}`);
    return data
  } catch (error) {
    return error;
  }
};
