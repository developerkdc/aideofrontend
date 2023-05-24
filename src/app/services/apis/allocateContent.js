import axios from "axios";

export const allocateContent = async (item,contentId) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.patch(
      `/api/v1/content/allocate/${contentId}`,
      { allocatedBy:item.allocatedBy , allocatedTo:item.allocatedTo },
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
