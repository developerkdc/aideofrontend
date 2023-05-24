import axios from "axios";

export const deleteLanguage = async (id) => {
  try {
    const data = await axios.delete(`/api/v1/language/${id}`);
    return data
  } catch (error) {
    return error;
  }
};
