import React, {PropTypes} from "react";


const TextInput = ({name, label, onChange, value, error}) => {
    let wrapperClass = "from-group";
    if (error && error.length > 0){
        wrapperClass += " " + "has-error";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label> 
            <div className="filed">
                <input
                    type="text"
                    name={name}
                    className="form-control"
                    value={value}
                    onChange={onChange}/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};



TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
}

export default TextInput;