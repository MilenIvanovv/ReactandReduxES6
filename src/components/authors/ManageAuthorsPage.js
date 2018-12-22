import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authorActions from "../../actions/authorActions";
import AuthorForm from "./AuthorForm";
import toastr from "toastr";

class ManageAuthorsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            author: Object.assign({}, this.props.author),
            errors: {},
            saving: false
        };

        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.CheckAuthorInCourses = this.CheckAuthorInCourses.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.author.id != nextProps.author.id) {
    //         this.setState({author: Object.assign({}, nextProps.author)});
    //     }
    // }

    updateAuthorState(event) {
        const field = event.target.name;
        let author = Object.assign({},this.state.author);
        author[field] = event.target.value;
        return this.setState({author: author}); 
    }

    saveAuthor(event) {
        event.preventDefault();
        this.setState({saving:true}); 
        this.props.actions.saveAuthor(this.state.author)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving:false}); 
        });
    }

    CheckAuthorInCourses(author) {
        const found = this.props.courses.filter(course => course.id == author);
        if(found) return found[0];
        return null;
    }

    deleteAuthor(event) {
        event.preventDefault();
        if(this.CheckAuthorInCourses(this.state.author)) {
            this.setState({saving:true}); 
            this.props.actions.deleteAuthor(this.state.author)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving:false}); 
            });
        } else 
        toastr.error("The Author has a course");
    }

    redirect() {
        this.setState({saving:false}); 
        toastr.success("Author saved");
        this.context.router.push("/authors");
    }    
   
    render() {
        return (
           <AuthorForm
            onChange={this.updateAuthorState}
            onSave={this.saveAuthor}
            onDelete={this.deleteAuthor}
            author={this.state.author}
            errors={this.state.errors}
            saving={this.state.saving}/>
        );
    }
}

ManageAuthorsPage.propTypes = {
    author: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageAuthorsPage.contextTypes = {
    router: PropTypes.object
};


function GetAuthorById(authors, id) {
    const author = authors.filter(author => author.id == id);
    if(author) return author[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id;
    let author = {id: "", firstName: "", lastName: ""};

    if(authorId && state.authors.length > 0) {
        author = GetAuthorById(state.authors, authorId);
    }

    return {
        author: author,
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorsPage);