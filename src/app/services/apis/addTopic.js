import axios from "axios";

export const addTopic = async (topic) => {
  try {
    const topic_data = {
      name: topic.name,
      description: topic.description
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/topic", topic_data, config);
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
