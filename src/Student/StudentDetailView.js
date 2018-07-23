import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { fetchStudentById } from '../api/student';


export default class StudentDetailView extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            student:'',
            UserLS:'',
        };
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        console.log("Student-DM", this.props.history);
        if (id !== 'NEW'){  //Ensure for existing courses
            this.setState({
                //Set status to loading
                isLoading: true,
            });
            //Get course by id
            fetchStudentById(id).then(response => {
                console.log("student by id:", response.data.UserLS.UserName);
                this.setState({
                    student: response.data,  //get course detail
                    UserLS: response.data.UserLS,
                    isLoading: false,       //loading done
                });
            }).catch(e => {
                console.log("student by id:", e);
                this.setState({
                    isLoading: false,   //loading done
                });
            });
        }
    }

    render(){
        console.log("Student-DM-R", this.props.location);
        //render "Loading" before setState callback
        const StudentId = this.state.isLoading ? "Loading" : this.state.student.StudentId;
        const GPA = this.state.isLoading ? "Loading" : this.state.student.GPA;

        //console.log(this.state.UserLS.UserName);
        return (
            <div>
                <h2 style = {{paddingTop: 20, paddingBottom: 50}}>Student detail</h2>
                <Card title={`Student ID: ${StudentId}`} bordered={true} style={{ background: '#ECECEC' }} >
                    
                    <p>{`Name: ${this.state.UserLS.UserName}`}</p>
                    <p>{`Address: ${this.state.UserLS.Address}`}</p>
                    <p>{`Email: ${this.state.UserLS.Email}`}</p>
                    <p>{`GPA: ${GPA}`}</p>
                </Card>
                
                <Button type="primary"
                    onClick={()=>{
                        this.props.history.push(`/students/edit/${this.props.match.params.id}`);
                    }} 
                    style={{width: 80, marginTop:80, marginRight: 40}}>
                        Edit
                </Button>
                <Button 
                    type="primary" 
                    onClick={()=>{
                        this.props.history.push("/students");
                    }} 
                    style={{width: 80, marginRight: 40}}>
                        Back
                </Button>
                
            </div>
        );
    }
}
