import React, {PropTypes} from "react";
import {Link} from "react-router";

const AuthorListRow = ({author}) => {
    return (
        <tr>
            <td><a href={author.watchHref} target="_blank">Page</a></td>
            <td><Link to={"/author/" + author.id}>{author.firstName} {author.lastName}</Link></td>
            <td>{author.id}</td>
            <td>asdf</td>
        </tr>
    );
};

AuthorListRow.PropTypes = {
    author: PropTypes.object.isRequired
};

export default AuthorListRow;