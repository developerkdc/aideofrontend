import axios from "axios";

export const configureTopic = async (topic) => {
  try {
    const topic_data = {
      contentIds: topic.contentIds,
      tagIds: topic.tags
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.patch(`/api/v1/topic/addContent/${topic.topicId}`, topic_data, config);
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
