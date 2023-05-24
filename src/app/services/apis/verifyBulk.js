import axios from "axios";

export const verifyBulk = async (statusIds) => {
  try {
    const body = {contentIds:statusIds}
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/content/status", body, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
