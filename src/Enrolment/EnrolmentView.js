import React, {Component} from 'react';

import { Tabs} from 'antd';
import { fetchStudents } from '../api/student';
import { fetchCourses } from '../api/course';

import { fetchUserAdminInfo } from '../api/user';

import EnrolmentCreateView from './EnrolmentCreateView';
import EnrolmentDeleteView from './EnrolmentDeleteView';

const TabPane = Tabs.TabPane;

export default class EnrolmentView extends Component{
    constructor(props){
        super(props);
        this.state= {
            flagValue: true,
            isLoading: false,
            students: [],
            courses:[],
            test: 'error'
        };
    }

    callback(key) {
        console.log(key);
    }

    componentDidMount(){
        //console.log('SGT1', this.state.flagValue);
        //before request API
        this.setState({
            isLoading: true,
        });
        //starting request API
        fetchStudents().then(response => {
            //console.log("fetchStudents",response.data);
            this.setState({
                students: response.data,
                //isLoading: false,   //DONE
                
            });
        }).catch(e => {
            console.log(e);
        });

        fetchCourses().then(response => {
            //console.log(response);
            this.setState({
                courses: response.data,
                isLoading: false,   //DONE
            });
        }).catch(e => {
            console.log(e);
        });
        
        let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
        console.log(jwt);
        fetchUserAdminInfo(jwt).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        });
    }

    render(){
        const { isLoading } = this.state;

        if (isLoading)
            return (<div>Loading Enrolments...</div>);
        return (
            <div>
                <Tabs onChange={() => this.callback()} type="card">
                    <TabPane tab="Create Enrolents" key="1">
                        <EnrolmentCreateView dataStudents = {this.state.students} dataCourses = {this.state.courses} />
                    </TabPane>
                    <TabPane tab="Delete Enrolments" key="2">
                        <EnrolmentDeleteView />
                    </TabPane>
                    <TabPane tab="View Enrolments" key="3">View Enrolments</TabPane>    
                </Tabs> 
            </div>
        );
    }
}