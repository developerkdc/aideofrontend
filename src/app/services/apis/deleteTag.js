import axios from "axios";

export const deleteTag = async (id) => {
  try {
    const data = await axios.delete(`/api/v1/tag/${id}`);
    return data
  } catch (error) {
    return error;
  }
};
