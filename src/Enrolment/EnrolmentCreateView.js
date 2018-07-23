import React, {Component} from 'react';

import { Steps, message, Button, AutoComplete } from 'antd';

import { saveEnrolment } from '../api/enrolment';

const Step = Steps.Step;
const steps = [{
    title: 'First',
    content: 'Please select student:',
  }, {
    title: 'Second',
    content: 'Please select course:',
  }, {
    title: 'Last',
    content: 'Will Create Enrolment:',
  }];

export default class EnrolmentCreateView extends Component{
    constructor(props){
        super(props);
        this.state= {
            current: 0,
            color: 'red',
            selectStudent: '',
            selectCourse: '',
        };
    }

    next() {
        if(this.state.current === 0 && this.state.selectStudent === ''){

            return;
        }
        const current = this.state.current + 1;
        this.setState({ current });
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

    }

    handleEnrolmentSubmit(){
        const dataUpdate = { StudentId: this.state.selectStudent, CourseId: this.state.selectCourse};
        console.log(dataUpdate);
        //POST API
        saveEnrolment(dataUpdate).then(response => {
            console.log(response);
            if(response.status === 200){
                //alert("Course added successfully!");
                message.success("Course added successfully!");
                this.setState({
                    current: 0, 
                    selectStudent: '',
                    selectCourse: '',
                });
                //this.props.passdownHistory.push("/courses");
            }
        }).catch(e => {
            console.log(e);
            alert(e);
        });
    }

    render(){
        const { current } = this.state;

        const dataStudents = this.props.dataStudents;
        const dataSourceStudents = dataStudents.map(item=>{
            return item.StudentId;           
        });

        const dataCourses = this.props.dataCourses;
        const dataSourceCourses = dataCourses.map(item=>{
            return item.CourseId;           
        });

        return(
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>

                <div className="steps-content" >
                    <div style={{color: this.state.color, padding: "20px"}}>{steps[current].content}</div>

                    <div style={{ display: (current !== 0) ? 'none' : 'block' }}>
                        <AutoComplete
                            style={{ width: 200 }}
                            dataSource={dataSourceStudents}
                            placeholder="try to type `s`"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            onSelect={this.onSelectStudent.bind(this)}
                        />
                        <div style={{paddingTop: "50px"}}><p>{`Selected Student: `}<span style={{padding: "20px", color: "green"}}>{`${this.state.selectStudent}`}</span></p></div>
                    </div>

                    <div style={{ display: (current !== 1) ? 'none' : 'block' }}>
                        <AutoComplete
                            style={{ width: 200 }}
                            dataSource={dataSourceCourses}
                            placeholder="try to type `c`"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            onSelect={this.onSelectCourse.bind(this)}
                        />
                        <div style={{paddingTop: "50px"}}><p>{`Selected Course: `}<span style={{padding: "20px", color: "green"}}>{`${this.state.selectCourse}`}</span></p></div>
                    </div>

                    <div style={{ color: "green", display: (current !== 2) ? 'none' : 'block' }}>
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
