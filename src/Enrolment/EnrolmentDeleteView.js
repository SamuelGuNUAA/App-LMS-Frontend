import React, {Component} from 'react';

import { Steps, message, Button, AutoComplete } from 'antd';

import { deleteEnrolment, fetchEnrolment } from '../api/enrolment';
import { fetchStudentById } from '../api/student';

const Step = Steps.Step;
const steps = [{
    title: 'First',
    content: 'Please select student',
  }, {
    title: 'Second',
    content: 'Please select course',
  }, {
    title: 'Last',
    content: 'Enrolment',
  }];

export default class EnrolmentDeleteView extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            current: 0,
            enrolments:[],
            selectStudent: '',
            selectCourse: '',
            dataSourceCourses: [],
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });

        if(current === 1){
            fetchStudentById(this.state.selectStudent).then(response => {
                console.log("Special student by id:", response.data);
                
                let dataSourceCourses =  response.data.Enrolments.map(item=>{
                    return item.CourseId;           
                });
                console.log("Special-1 student by id:", dataSourceCourses);
                this.setState({
                    dataSourceCourses: dataSourceCourses,   //loading done
                });

            }).catch(e => {
                console.log("student by id:", e);
            });
        }
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    onSelectStudent(value){
        console.log(value);
        this.setState({selectStudent: value});
    }

    onSelectCourse(value){
        console.log(value);
        this.setState({selectCourse: value});
    }

    componentDidMount(){
        this.setState({
            isLoading: true,
        });
        //starting request API
        fetchEnrolment().then(response => {
            console.log("fetchEnrolment",response.data);
            //console.log(response.data.StudentId);
            this.setState({
                enrolments: response.data,
                isLoading: false,   //DONE
                
            });
        }).catch(e => {
            console.log(e);
        });
    }

    handleEnrolmentSubmit(){
        let dataUpdate = { data: { StudentId: this.state.selectStudent, CourseId: this.state.selectCourse }};
        console.log("111",dataUpdate);
        //POST API
        deleteEnrolment(dataUpdate).then(response => {
            console.log("delete", response);
            if(response.status === 200){
                //alert("Course added successfully!");
                message.success("Course added successfully!");
                this.setState({current: 0});
                //this.props.passdownHistory.push("/courses");
            }
        }).catch(e => {
            console.log(e);
            alert(e);
            this.setState({current: 0});
        });
    }

    render(){
        const { current } = this.state;

        //const dataStudents = this.state.enrolments;
        const dataSourceStudents = this.state.enrolments.map(item=>{
            return item.StudentId;           
        });
        const dataStudents = dataSourceStudents.filter(function (element, index, self){
            return self.indexOf(element) === index;
        });



        return(
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>

                <div className="steps-content" >
                    <div>{steps[current].content}</div>

                    <div style={{ display: (current !== 0) ? 'none' : 'block' }}>
                        <AutoComplete
                            style={{ width: 200 }}
                            dataSource={ dataStudents }
                            placeholder="try to type `s`"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            onSelect={ this.onSelectStudent.bind(this) }
                        />
                        <div><p>{`Selected Student: ${this.state.selectStudent}`}</p></div>
                    </div>

                    <div style={{ display: (current !== 1) ? 'none' : 'block' }}>
                        <AutoComplete
                            style={{ width: 200 }}
                            dataSource={ this.state.dataSourceCourses }
                            placeholder="try to type `c`"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            onSelect={ this.onSelectCourse.bind(this) }
                        />
                        <div><p>{`Selected Course: ${this.state.selectCourse}`}</p></div>
                    </div>

                    <div style={{ display: (current !== 2) ? 'none' : 'block' }}>
                        <div><p>{`Selected Student: ${this.state.selectStudent}`}</p></div> 
                        <div><p>{`Selected Course: ${this.state.selectCourse}`}</p></div>
                    </div>
                </div>
                <div className="steps-action">
                {
                    current < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>Next</Button>
                }
                {
                    current === steps.length - 1
                    && <Button type="primary" onClick={() => {this.handleEnrolmentSubmit()}}>Submit</Button>
                }
                {
                    current > 0
                    && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                    </Button>
                    )
                }
                </div>
            </div>
        );
    }
}
