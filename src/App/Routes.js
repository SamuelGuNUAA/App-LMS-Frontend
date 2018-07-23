import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './Home'
import CourseView from '../Course/CourseView';
import StudentView from '../Student/StudentView';
import LecturerView from '../Lecturer/LecturerView';

import CourseDetailView from '../Course/CourseDetailView';
import CourseEditView from '../Course/CourseEditView';

import StudentDetailView from '../Student/StudentDetailView';
import StudentEditView from '../Student/StudentEditView';

import LecturerDetailView from '../Lecturer/LecturerDetailView';
import LecturerEditView from '../Lecturer/LecturerEditView';

import EnrolmentView from '../Enrolment/EnrolmentView';

import UserLoginView from '../User/UserLoginView';
import UserRegisterView from '../User/UserRegisterView';

import UserDetailView from '../User/UserDetailView';

export default () => ((
    <div>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/courses" component={ CourseView } />
        <Route exact path="/students" component={ StudentView } />
        <Route exact path="/lecturers" component={ LecturerView } />

        <Route exact path="/courses/:id" component={CourseDetailView} />
        <Route exact path="/courses/edit/:id" component={CourseEditView} />

        <Route exact path="/students/:id" component={StudentDetailView} />
        <Route exact path="/students/edit/:id" component={StudentEditView} />

        <Route exact path="/lecturers/:id" component={LecturerDetailView} />
        <Route exact path="/lecturers/edit/:id" component={LecturerEditView} />

        <Route exact path="/enrolments/" component={EnrolmentView} />

        <Route exact path="/user/login" component={UserLoginView} />
        <Route exact path="/user/register/" component={UserRegisterView} />

        <Route exact path="/:id/detail" component={UserDetailView} />
    </div>
));