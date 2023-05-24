import axios from "axios";

export const updateUserDetails = async (user,userId) => {
  try {
    const user_data = {
      name: user?.name,
      email: user?.email,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.put("/api/v1/users/details/update", user_data, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
