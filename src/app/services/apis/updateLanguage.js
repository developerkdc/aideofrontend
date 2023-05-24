import axios from "axios";

export const updateLanguage = async (item) => {
  try {
    // console.log(item)
    const language_data = {
      name: item.name,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.patch(`/api/v1/language/${item._id}`, language_data, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
