import React, {PropTypes} from "react";
import Header from "./common/Header";
import {connect} from "react-redux";

class App extends React.Component {
    render () {
        return (
            <div className="container-fluid">
                <Header loading = {this.props.loading} courses = {this.props.courses}/>
                {this.props.children}
            </div>
        );
    }

}

App.PropTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state,ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        courses: state.courses
    };
}


export default connect(mapStateToProps)(App);