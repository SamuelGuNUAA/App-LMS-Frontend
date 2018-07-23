import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { fetchCourseById } from '../api/course';

export default class CourseDetailView extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            course:[],
        };
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        //console.log("ST8", this.props.history);
        if (id !== 'NEW'){  //Ensure for existing courses
            this.setState({
                //Set status to loading
                isLoading: true,
            });
            //Get course by id
            fetchCourseById(id).then(response => {
                console.log("course by id:", response);
                this.setState({
                    course: response.data,  //get course detail
                    isLoading: false,       //loading done
                });
            }).catch(e => {
                console.log("course by id:", e);
                this.setState({
                    isLoading: false,   //loading done
                });
            });
        }
    }

    render(){
        //console.log("ST4", this.props.location);
        //render "Loading" before setState callback
        const Name = this.state.isLoading ? "Loading" : this.state.course.Name;
        const CourseId = this.state.isLoading ? "Loading" : this.state.course.CourseId;
        return (
            <div>
                <h2 style = {{paddingTop: 20, paddingBottom: 50}}>Course detail</h2>
                <Card title={`Course Name: ${Name}`} bordered={true} style={{ background: '#ECECEC' }} >
                    <p>{`Course ID: ${CourseId}`}</p>
                    <p>course description</p>
                    <p>course description</p>
                </Card>
                
                <Button type="primary"
                    onClick={()=>{
                        this.props.history.push(`/courses/edit/${this.props.match.params.id}`);
                    }} 
                    style={{width: 80, marginTop:80, marginRight: 40}}>
                        Edit
                </Button>
                <Button 
                    type="primary" 
                    onClick={()=>{
                        this.props.history.push("/courses");
                    }} 
                    style={{width: 80, marginRight: 40}}>
                        Back
                </Button>
                
            </div>
        );
    }
}