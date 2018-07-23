import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import CourseCard from './CourseCard';
import { Row, Button } from 'antd';

import { fetchCourses } from '../api/course';

export default class CourseView extends Component{
    constructor(props){
        super(props);
        this.state= {
            flagValue: true,
            isLoading: false,
            courses:[]
        };
    }

    componentDidMount(){
        //console.log('SGT1', this.state.flagValue);
        //before request API
        this.setState({
            isLoading: true,
        });
        //starting request API
        fetchCourses().then(response => {
            console.log(response);
            this.setState({
                courses: response.data,
                isLoading: false,   //DONE
            });
        }).catch(e => {
            console.log(e);
        });
    }

    rerender(flagValue){
        
        console.log("SG-A",flagValue);
        this.setState({
            flagValue: flagValue,
        });
        //this.props.history.go(0);
    }

    render(){
        //console.log(this.state.courses);
        const {isLoading} = this.state;
        if (isLoading)
            return (<div>Loading Course</div>);
        return (
            <div>
                <Link to={`/courses/edit/NEW`}><Button icon='plus' type="primary">New Course</Button></Link>
                <Row gutter={16}>
                    {this.state.courses.map((value) => <CourseCard  lesson={value} key={value.id} rerender={(flagValue)=>this.rerender(flagValue)}/>)}
                </Row>
            </div>
        );
    }
}