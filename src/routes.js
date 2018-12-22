import React from "react";
import {Route, IndexRoute } from "react-router";
import App from "./components/app";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import CoursesPage from "./components/course/CoursesPage";
import AuthorsPage from "./components/authors/AuthorsPage";
import ManageCoursePage from "./components/course/ManageCoursePage";
import ManageAuthorsPage from "./components/authors/ManageAuthorsPage";


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="courses"component={CoursesPage} />
        <Route path="authors"component={AuthorsPage} />
        <Route path="author"component={ManageAuthorsPage} />
        <Route path="author/:id"component={ManageAuthorsPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:id" component={ManageCoursePage} />
        <Route path="about" component={AboutPage} />
    </Route>
);