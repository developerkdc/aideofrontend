import axios from "axios";

export const editTopic = async (item) => {
  try {
    // console.log(item)
    const topic_data = {
      name: item.name,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.patch(`/api/v1/topic/edit/${item._id}`, topic_data, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
