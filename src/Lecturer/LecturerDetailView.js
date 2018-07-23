import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { fetchLecturerById } from '../api/lecturer';


export default class LecturerDetailView extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            lecturer:[],
        };
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        console.log("Lecturer-DM", this.props.history);
        if (id !== 'NEW'){  //Ensure for existing courses
            this.setState({
                //Set status to loading
                isLoading: true,
            });
            //Get course by id
            fetchLecturerById(id).then(response => {
                console.log("lecturer by id:", response);
                this.setState({
                    lecturer: response.data,  //get course detail
                    isLoading: false,       //loading done
                });
            }).catch(e => {
                console.log("lecturer by id:", e);
                this.setState({
                    isLoading: false,   //loading done
                });
            });
        }
    }

    render(){
        console.log("Lecturer-DM-R", this.props.location);
        //render "Loading" before setState callback
        const LecturerId = this.state.isLoading ? "Loading" : this.state.lecturer.LecturerId;
        const Salary = this.state.isLoading ? "Loading" : this.state.lecturer.Salary;
        return (
            <div>
                <h2 style = {{paddingTop: 20, paddingBottom: 50}}>Lecturer detail</h2>
                <Card title={`Lecturer ID: ${LecturerId}`} bordered={true} style={{ background: '#ECECEC' }} >
                    <p>{`Salary: ${Salary}`}</p>
                    <p>...</p>
                </Card>
                
                <Button type="primary"
                    onClick={()=>{
                        this.props.history.push(`/lecturers/edit/${this.props.match.params.id}`);
                    }} 
                    style={{width: 80, marginTop:80, marginRight: 40}}>
                        Edit
                </Button>
                <Button 
                    type="primary" 
                    onClick={()=>{
                        this.props.history.push("/lecturers");
                    }} 
                    style={{width: 80, marginRight: 40}}>
                        Back
                </Button>
                
            </div>
        );
    }
}