import React, {PropTypes} from "react";
import AuthorListRow from "./AuthorListRow";

const AuthorsList = ({authors}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Name</th>
                    <th>Courses</th>
                    <th>Empty</th>
                </tr>
            </thead>
            <tbody>
                {authors.map(author => 
                    <AuthorListRow key={author.id} author={author}/>
                )}
            </tbody>
        </table>
    );
};

AuthorsList.PropTypes = {
    authors: PropTypes.array.isRequired
};

export default AuthorsList;