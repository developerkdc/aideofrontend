import axios from "axios";

export const configTopicType = async (item,topicId) => {
  try {
    // console.log(item)
    const topic_data = {
      configType: item,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.patch(`/api/v1/topic/config/${topicId}`, topic_data, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
