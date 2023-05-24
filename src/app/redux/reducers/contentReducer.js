import {
  ALL_CONTENT_FAIL,
  ALL_CONTENT_REQUEST,
  ALL_CONTENT_SUCCESS,
  MY_CONTENT_FAIL,
  MY_CONTENT_REQUEST,
  MY_CONTENT_SUCCESS,
  MY_CONTENT_TO_VERIFY_FAIL,
  MY_CONTENT_TO_VERIFY_REQUEST,
  MY_CONTENT_TO_VERIFY_SUCCESS,
  TOPIC_CONTENT_FAIL,
  TOPIC_CONTENT_REQUEST,
  TOPIC_CONTENT_SUCCESS,
} from "app/utils/constants/contentConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  allContent: [],
  verifyContent: [],
  topicContent: [],
};

export const contentReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALL_CONTENT_REQUEST:
    case MY_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CONTENT_SUCCESS:
    case MY_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        allContent: action.payload,
      };
    case ALL_CONTENT_FAIL:
    case MY_CONTENT_FAIL:
      return {
        ...state,
        allContent: null,
        loading: false,
        error: action.payload,
      };
    case MY_CONTENT_TO_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_CONTENT_TO_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        verifyContent: action.payload,
      };
    case MY_CONTENT_TO_VERIFY_FAIL:
      return {
        ...state,
        verifyContent: null,
        loading: false,
        error: action.payload,
      };
    case TOPIC_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOPIC_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        topicContent: action.payload,
      };
    case TOPIC_CONTENT_FAIL:
      return {
        ...state,
        loading: false,
        topicContent: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
