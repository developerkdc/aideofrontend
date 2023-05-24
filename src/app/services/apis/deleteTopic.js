import axios from "axios";

export const deleteTopic = async (id) => {
  try {
    const data = await axios.delete(`/api/v1/topic/${id}`);
    return data
  } catch (error) {
    return error;
  }
};
