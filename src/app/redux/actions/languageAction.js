import {
  ALL_LANGUAGE_FAIL,
  ALL_LANGUAGE_REQUEST,
  ALL_LANGUAGE_SUCCESS,
} from "app/utils/constants/languageConstants";
import axios from "axios";

export const getAllLanguages = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LANGUAGE_REQUEST });
    const data = await axios.get("/api/v1/language");
    //   console.log(data);
    dispatch({ type: ALL_LANGUAGE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ALL_LANGUAGE_FAIL,
      payload: error.response.data.description,
    });
  }
};
