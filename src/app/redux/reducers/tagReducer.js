import {
  ALL_TAGS_FAIL,
  ALL_TAGS_REQUEST,
  ALL_TAGS_SUCCESS,
} from "app/utils/constants/tagConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  alltags: [],
};

export const tagReducer = (state = INIT_STATE , action) => {
  switch (action.type) {
    case ALL_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        alltags: action.payload,
      };
    case ALL_TAGS_FAIL:
      return {
        ...state,
        alltags: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
