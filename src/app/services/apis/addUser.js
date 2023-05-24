import axios from "axios";

export const addUser = async (user) => {
  try {
    const user_data = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/admin/register", user_data, config);
    console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
