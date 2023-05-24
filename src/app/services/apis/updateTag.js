import axios from "axios";

export const updateTag = async (item) => {
  try {
    // console.log(item)
    const tag_data = {
      name: item.name,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.patch(`/api/v1/tag/${item._id}`, tag_data, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
