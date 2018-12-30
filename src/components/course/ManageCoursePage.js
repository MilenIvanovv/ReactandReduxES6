import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as courseActions from "../../actions/courseActions";
import * as formActions from "../../actions/formActions";
import CourseForm from "./CourseForm";
import toastr from "toastr";

class ManageCoursePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false,
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    componentWillUnmount() {
        if (this.state.course.id === "")
        this.props.actions.saveUnsavedChanges(this.state.course);
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({},this.state.course);
        course[field] = event.target.value;
        return this.setState({course: course}); 
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({saving:true}); 
        this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving:false}); 
        });
    }

    deleteCourse(event) {
        event.preventDefault();
        this.setState({saving:true}); 
        this.props.actions.deleteCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving:false}); 
        });
    }

    redirect() {
        this.setState({saving:false}); 
        toastr.success("Course saved");
        this.context.router.push("/courses");
    }    
   
    render() {
        return (
            <CourseForm
            allAuthors={this.props.authors}
            onChange={this.updateCourseState}
            onSave={this.saveCourse}
            onDelete={this.deleteCourse}
            course={this.state.course}
            errors={this.state.errors}
            saving={this.state.saving}/>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function GetCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if(course) return course[0];
    return null;
}


function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; 
    let course = {id: "", watchHref: "", title: "", authorId: "", length: "", category: ""};

    if(ownProps.params.id === "NewCourse") {
        course = state.UnSavedCourse
    }
    else if(courseId && state.courses.length > 0) {
        course = GetCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + " " + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, courseActions, formActions),dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);