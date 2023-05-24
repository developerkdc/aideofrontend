import axios from "axios";

export const updateUserDetailsAdmin = async (user) => {
  try {
    const user_data = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.put("/api/v1/admin/user/details", user_data, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
