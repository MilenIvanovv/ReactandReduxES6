import * as types from "./actionTypes";
import AuthorApi from "../api/mockAuthorApi";
import {beginAjaxCall} from './ajaxStatusActions';

 export function loadAuthorsSueccess(authors) {
     return {type: types.LOAD_AUTHORS_SUCCESS, authors};
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