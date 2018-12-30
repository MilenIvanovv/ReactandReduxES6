import * as types from "../actions/actionTypes";
import initialState from "./initialState";


export default function courseReducer(state = initialState.UnSavedCourse, action) {
    switch (action.type) {
        case types.SAVE_UNSAVED_CHANGES:
            return action.course;

        default:
            return state;
    }
}

