import axios from "axios";

export const addTag = async (user) => {
  try {
    const user_data = {
      name: user.name,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/tag", user_data, config);
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
