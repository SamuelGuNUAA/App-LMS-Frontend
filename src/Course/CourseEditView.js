import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Input, Button, Form, message } from 'antd';
import { fetchCourseById, saveCourse, updateCourse } from '../api/course';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
};

class CourseEditForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isVerified: false,
            courseId: '',
            courseName: '',
            CourseDesc: '',
        };
    }

    _isNew(){
        return this.props.passdownState.isNew;
    }

    componentDidMount(){
        //console.log("SGT2",this.props.passdownState.course);
        this.props.form.validateFields();
        this.setState({
            courseId: this.props.passdownState.course.courseId,
            courseName: this.props.passdownState.course.Name,
            CourseDesc: this.props.passdownState.course.Introduction,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
        
                //check POST or PUT
                if(this._isNew()){
                    let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
                    let dataUpdate = { CourseId: values.CourseId, Name: values.CourseName, Introduction: values.CourseDesc};
                    saveCourse(dataUpdate, jwt).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //alert("Course added successfully!");
                            message.success("Course added successfully!");
                            this.props.passdownHistory.push("/courses");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                }else{
                    let dataUpdate = { CourseId: this.state.CourseId, Name: values.CourseName, Introduction: values.CourseDesc};
                    console.log(dataUpdate);
                    updateCourse(this.props.passdownId, dataUpdate).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //alert("Course updated successfully!");
                            message.success("Course updated successfully!");
                            this.props.passdownHistory.push("/courses");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                    ///console.log("ST5", this.props.passdownHistory);
                    this.props.passdownHistory.push("/courses");
                }
                
            }else{
                console.log(err,values.CourseId);
                if(!this._isNew() && values.CourseId === undefined){
                    //console.log("s-1",values.CourseId);
                    let dataUpdate = { CourseId: this.props.passdownId, Name: values.CourseName, Introduction: values.CourseDesc};
                    console.log(dataUpdate);
                    //console.log(this.props.passdownId);
                    //console.log(this.state.courseId);
                    updateCourse(this.props.passdownId, dataUpdate).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //alert("Course updated successfully!");
                            message.success("Course updated successfully!");
                            this.props.passdownHistory.push("/courses");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                    ///console.log("ST5", this.props.passdownHistory);
                    this.props.passdownHistory.push("/courses");
                }
            }
        });
    }

    //Back to student view page
    handleCancel(e){
        //Clear state and quit
        this.setState({
            isVerified: false,
            courseId: '',
            courseName: '',
            CourseDesc: '',
        });
        this.props.passdownHistory.push("/courses");
    }

    render(){

        const { TextArea } = Input;
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const courseIdError = isFieldTouched('CourseId') && getFieldError('CourseId');
        const courseNameError = isFieldTouched('CourseName') && getFieldError('CourseName');
        const courseDescError = isFieldTouched('CourseDesc') && getFieldError('CourseDesc');
        //console.log("SGT3");
        const inputDisabled = this._isNew() 
                                    ? <Input placeholder={this.props.passdownState.course.CourseId} value ={this.state.courseId} onChange={(e) => this.setState({courseId:e.target.value})}/> 
                                    : <Input disabled placeholder={this.props.passdownState.course.CourseId} value ={this.state.courseId} onChange={(e) => this.setState({courseId:e.target.value})}/>;

        return(
            <div>
            <h2 style = {{paddingTop: 30, paddingBottom: 50}}>{this._isNew()? 'Create a new course':'Edit a course'}</h2>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    { ...formItemLayout }
                    validateStatus={courseIdError ? 'error' : ''}
                    help={courseIdError || ''}
                    label= "Course ID:"
                >
                    
                    {getFieldDecorator('CourseId', {
                        rules: [{ required: true, message: 'Please input course ID!' }],
                    })(           
                        inputDisabled
                    )}
                </FormItem>

                <FormItem
                    { ...formItemLayout }
                    validateStatus={courseNameError ? 'error' : ''}
                    help={courseNameError || ''}
                    label= "Name:"
                >
                    
                    {getFieldDecorator('CourseName', {
                        rules: [{ required: true, message: 'Please input course name!' }],
                    })(
                        
                        <Input placeholder={this.props.passdownState.course.Name} value ={this.state.courseName} onChange={(e) => this.setState({courseName:e.target.value})}/>
                    )}
                </FormItem>

                <FormItem
                    { ...formItemLayout }
                    label= "Course Description:"
                >

                    {getFieldDecorator('CourseDesc', {

                    })(
                        <TextArea rows={6} placeholder={this.props.passdownState.course.Introduction} value ={this.state.CourseDesc} onChange={(e) => this.setState({CourseDesc:e.target.value})}/>
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{width: 80, marginTop:40, marginLeft: 80}}>
                        {this._isNew()? 'Create':'Save'}
                    </Button>
                    <Button type="secondly" htmlType="cancel" style={{width: 80, marginLeft: 80}} onClick={ (e) => this.handleCancel(e) }>
                        Cancel
                    </Button>
                </FormItem>
            </Form>

            </div>
            
        );
    }
}
const WrappedCourseEditForm = Form.create()(CourseEditForm);


export default class CourseEditView extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            isNew: false,
            //isEditing: false,
            course:[],
        };
        console.log("ST", props.location);
    }

    componentDidMount(){
        console.log("ST1", this.props.location);
        if ('NEW' === this.props.match.params.id){
            this.setState({
                isNew: true, 
                course: {},
                //isEditing: true,
            });
            return;
        }
        this.setState({
            isNew: false,
        });
        fetchCourseById(this.props.match.params.id).then(response => {
            console.log(response);
            this.setState({
                course: response.data,
                //isEditing: true,
            });
        }).catch(e => {
            console.log(e);
        });
        //ST
        //console.log("ST6");
        //this.props.history.push("/students");
        //ST
    }

    render(){
        console.log("ST2", this.props.history);
        return (
            <div>
                <WrappedCourseEditForm passdownState={this.state} passdownId={this.props.match.params.id} passdownHistory={this.props.history}/>
            </div>
        );
    }
}