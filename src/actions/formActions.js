import * as types from "./actionTypes";

export function saveUnsavedChanges(course) {
    return { type: types.SAVE_UNSAVED_CHANGES, course};
}

