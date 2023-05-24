import { ALL_TAGS_FAIL, ALL_TAGS_REQUEST, ALL_TAGS_SUCCESS } from "app/utils/constants/tagConstants";
import axios from "axios";

export const getAllTags = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_TAGS_REQUEST });
      const data = await axios.get("/api/v1/tag");
    //   console.log(data);
      dispatch({ type: ALL_TAGS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ALL_TAGS_FAIL,
        payload: error.response.data.description,
      });
    }
  };