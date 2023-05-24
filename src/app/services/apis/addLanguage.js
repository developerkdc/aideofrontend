import axios from "axios";

export const addLanguage = async (language) => {
  try {
    const language_data = {
      language: language.name,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/language", language_data, config);
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
