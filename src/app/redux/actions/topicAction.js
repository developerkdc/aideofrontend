import { ALL_TOPIC_FAIL, ALL_TOPIC_REQUEST, ALL_TOPIC_SUCCESS } from "app/utils/constants/topicConstants";
import axios from "axios";

export const getAllTopics = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_TOPIC_REQUEST });
      const data = await axios.get("/api/v1/topic");
    //   console.log(data);
      dispatch({ type: ALL_TOPIC_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ALL_TOPIC_FAIL,
        payload: error.response.data.description,
      });
    }
  };