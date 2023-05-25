import axios from "axios";

export const resetPassword = async (item) => {
  try {
    const body = {
      password: item.password,
      confirmPassword: item.confirmPassword,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `/api/v1/users/password/reset/${item.token}`,
      body,
      config
    );
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
