import {
  ALL_LANGUAGE_FAIL,
  ALL_LANGUAGE_REQUEST,
  ALL_LANGUAGE_SUCCESS,
} from "app/utils/constants/languageConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  alllanguages: [],
};

export const languageReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALL_LANGUAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        alllanguages: action.payload,
      };
    case ALL_LANGUAGE_FAIL:
      return {
        ...state,
        alllanguages: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
