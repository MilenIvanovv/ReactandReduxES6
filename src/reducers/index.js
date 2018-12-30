import {combineReducers} from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import UnSavedCourse from "./formReducer";

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress,
    UnSavedCourse
});

export default rootReducer;