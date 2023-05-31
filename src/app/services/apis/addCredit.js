import axios from "axios";

export const addCredits = async (names) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/content/credits", {names:names}, config);
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
