import React from "react";
import TextInput from "../common/TextInput";

const AuthorsForm = ({author, onSave,onDelete, onChange, saving, errors}) => {
    return(
        <form>
            <h1>Manage Authors</h1>
            <TextInput
                name="firstName"
                label="FirstName"
                value={author.firstName}
                onChange={onChange}
                error={errors.firstName}/>

            <TextInput
                name="lastName"
                label="LastName"
                value={author.lastName}
                onChange={onChange}
                error={errors.lastName}/> 

            <input 
                type="submit"
                disabled={saving}
                value={saving ? "Saving..." : "Save"}
                className="btn btn-primary"
                onClick={onSave}/>

            <input 
                type="submit"
                disabled={saving}
                value={saving ? "Deleting..." : "Delete"}
                className="btn btn-primary"
                onClick={onDelete}/>
        </form>
    );
};


AuthorsForm.propTypes = {
    // author: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
}

export default AuthorsForm;