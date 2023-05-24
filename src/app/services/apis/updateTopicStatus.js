import axios from "axios";

export const updateTopicStatus = async (id, status) => {
  try {
    let updatedStatus = "";
    if (status == "active") {
      updatedStatus = "inactive";
    } else {
      updatedStatus = "active";
    }
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.put(
      "/api/v1/topic/status",
      { id, status:updatedStatus },
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
