import {
  ALL_CONTENT_FAIL,
  ALL_CONTENT_REQUEST,
  ALL_CONTENT_SUCCESS,
  MY_CONTENT_TO_VERIFY_FAIL,
  MY_CONTENT_TO_VERIFY_REQUEST,
  MY_CONTENT_TO_VERIFY_SUCCESS,
  TOPIC_CONTENT_FAIL,
  TOPIC_CONTENT_REQUEST,
  TOPIC_CONTENT_SUCCESS,
} from "app/utils/constants/contentConstants";
import axios from "axios";

export const getAllContent = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CONTENT_REQUEST });
    const data = await axios.get("/api/v1/content");
    //   console.log(data);
    dispatch({ type: ALL_CONTENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ALL_CONTENT_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const getMyContent = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CONTENT_REQUEST });
    const data = await axios.get("/api/v1/content/mycontent");
    //   console.log(data);
    dispatch({ type: ALL_CONTENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ALL_CONTENT_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const getMyContentToVerify = () => async (dispatch) => {
  try {
    dispatch({ type: MY_CONTENT_TO_VERIFY_REQUEST });
    const data = await axios.get("/api/v1/content/verify/mycontent");
    //   console.log(data);
    dispatch({ type: MY_CONTENT_TO_VERIFY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: MY_CONTENT_TO_VERIFY_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const getContentByTags = (tags) => async (dispatch) => {
  try {
    console.log(tags)
    dispatch({type: ALL_CONTENT_REQUEST})
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/content/tags",{tagIds:tags},config);
    //   console.log(data);
    
    dispatch({ type: ALL_CONTENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ALL_CONTENT_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const getContentByTopic = (topicId) => async (dispatch) => {
  try {
    dispatch({type: TOPIC_CONTENT_REQUEST})
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.get(`/api/v1/content/${topicId}`);
    //   console.log(data);
    
    dispatch({ type: TOPIC_CONTENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: TOPIC_CONTENT_FAIL,
      payload: error.response.data.description,
    });
  }
};
