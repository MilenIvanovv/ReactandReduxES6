import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from "redux";
import CourseList from "./CourseList";
import {browserHistory} from "react-router";

class CoursesPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            NoCourses:false
        };

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

   

    redirectToAddCoursePage() {
        browserHistory.push("/course/NewCourse");
    }
   
    render() {
        const {courses} = this.props;
        courses.length ? (this.state.NoCourses = false):(this.state.NoCourses = true);

        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value = "Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>
                    {!this.state.NoCourses ? (<CourseList courses={courses}/>):
                    (<span>No Courses</span>)}
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


function SortCoursebyTitle(a,b) {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
}

function mapStateToProps(state, ownProps) {
    return {
        courses:[...state.courses].sort(SortCoursebyTitle)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);