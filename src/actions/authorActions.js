import * as types from "./actionTypes";
import AuthorApi from "../api/mockAuthorApi";
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';

 export function loadAuthorsSueccess(authors) {
     return {type: types.LOAD_AUTHORS_SUCCESS, authors};
 }

 export function createAuthorsSuccess(author) {
    return { type: types.CREATE_AUTHORS_SUCCESS, author};
}

 export function deleteAuthorsSuccess(author) {
    return { type: types.DELETE_AUTHORS_SUCCESS, author};
}

 export function updateAuthorsSuccess(author) {
    return { type: types.UPDATE_AUTHORS_SUCCESS, author};
}

 export function loadAuthors() {
     return function(dispatch) {
         dispatch(beginAjaxCall());
         return AuthorApi.getAllAuthors().then(authors => {
             dispatch(loadAuthorsSueccess(authors));
         }).catch(error => {
             throw(error);
        });
     };
 }


 export function saveAuthor(author) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());
        return AuthorApi.saveAuthor(author).then(savedAuthor => {
            author.id ? dispatch(updateAuthorsSuccess(savedAuthor)) :
           dispatch(createAuthorsSuccess(savedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

 export function deleteAuthor(author) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());
        return AuthorApi.deleteAuthor(author.id).then(
            dispatch(deleteAuthorsSuccess(author))).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}