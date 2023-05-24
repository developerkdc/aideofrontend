import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import contactsApp from "./contactsApp";
import { userReducer } from "./userReducer";
import { tagReducer } from "./tagReducer";
import { languageReducer } from "./languageReducer";
import { topicReducer } from "./topicReducer";
import { contentReducer } from "./contentReducer";

const exportReducers = (history) => {
  return combineReducers({
    // router: connectRouter(history),
    // contactsApp: contactsApp,
    userReducer: userReducer,
    tagReducer: tagReducer,
    languageReducer: languageReducer,
    topicReducer: topicReducer,
    contentReducer: contentReducer
  });
};

export default exportReducers;
