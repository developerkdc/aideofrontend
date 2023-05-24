
import { ALL_TOPIC_FAIL, ALL_TOPIC_REQUEST, ALL_TOPIC_SUCCESS } from "app/utils/constants/topicConstants";
  
  const INIT_STATE = {
    loading: false,
    error: null,
    alltopics: [],
  };
  
  export const topicReducer = (state = INIT_STATE , action) => {
    switch (action.type) {
      case ALL_TOPIC_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_TOPIC_SUCCESS:
        return {
          ...state,
          loading: false,
          alltopics: action.payload,
        };
      case ALL_TOPIC_FAIL:
        return {
          ...state,
          alltopics: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  