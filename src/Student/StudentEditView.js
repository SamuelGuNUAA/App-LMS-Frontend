import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Input, Button, Form, message } from 'antd';
import { fetchStudentById, saveStudent, updateStudent } from '../api/student';
import { saveUserInitial } from '../api/user';

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

class StudentEditForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isVerified: false,
            studentId: '',
            GPA: '',
        };
    }

    _isNew(){
        return this.props.passdownState.isNew;
    }

    componentDidMount(){
        console.log("Student-Edit-1");
        this.props.form.validateFields();
        this.setState({
            courseName: this.props.passdownState.student.GPA,
            studentId: this.props.passdownState.student.studentId,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            
                const dataUpdate = { StudentId: values.StudentId, GPA: values.GPA};
                console.log(dataUpdate);
                //check POST or PUT
                if(this._isNew()){
                    let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
                    saveStudent(dataUpdate, jwt).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //User table create
                            saveUserInitial({StudentId: values.StudentId}).then(response => {
                                console.log(response);

                            }).catch(e => {
                                console.log(e);
                                alert(e);
                            })
                            //
                            //alert("Course added successfully!");
                            message.success("Student added successfully!");
                            this.props.passdownHistory.push("/students");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                }else{
                    updateStudent(this.props.passdownId, dataUpdate).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //alert("Course updated successfully!");
                            message.success("Student updated successfully!");
                            this.props.passdownHistory.push("/students");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                    ///console.log("ST5", this.props.passdownHistory);
                    this.props.passdownHistory.push("/students");
                }
                
            }else{
                //No student ID input
                console.log(err.StudentId.errors[0].message);
                message.error(err.StudentId.errors[0].message);
            }
        });
    }

    //Back to student view page
    handleCancel(e){
        //Clear state and quit
        this.setState({
            isVerified: false,
            studentId: '',
            GPA: '',
        });
        this.props.passdownHistory.push("/students");
    }

    render(){

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const StudentIdError = isFieldTouched('StudentId') && getFieldError('StudentId');
        const studentGPAError = isFieldTouched('GPA') && getFieldError('GPA');
        //console.log("SGT3");
        const inputDisabled = this._isNew() 
                                    ? <Input placeholder={this.props.passdownState.student.studentId} value ={this.state.studentId} onChange={(e) => this.setState({studentId:e.target.value})}/> 
                                    : <Input disabled placeholder={this.props.passdownState.student.studentId} value ={this.state.studentId} onChange={(e) => this.setState({studentId:e.target.value})}/>;

        return(
            <div>
                <h2 style = {{paddingTop: 30, paddingBottom: 50}}>{this._isNew()? 'Create a new student':'Edit a student'}</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        { ...formItemLayout }
                        validateStatus={ StudentIdError ? 'error' : '' }
                        help = { StudentIdError || '' }
                        label = "Student ID:"
                    >
                        {getFieldDecorator('StudentId', {
                            rules: [{ required: true, message: 'Please input student ID!' }],
                        })(
                            inputDisabled
                        )}
                    </FormItem>

                    <FormItem
                        { ...formItemLayout }
                        validateStatus={studentGPAError ? 'error' : ''}
                        help = {studentGPAError || ''}
                        label = "GPA:"
                    >
                        {getFieldDecorator('GPA', {
                            rules: [{ required: false, message: 'Please input course GPA!' }],
                        })(
                            <Input placeholder={this.props.passdownState.student.GPA} value ={this.state.GPA} onChange={(e) => this.setState({GPA:e.target.value})}/>
                        )}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{width: 80, marginTop:80, marginLeft: 80}}>
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
const WrappedStudentEditForm = Form.create()(StudentEditForm);


export default class StudentEditView extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            isNew: false,
            //isEditing: false,
            student:[],
        };
        //console.log("ST", props.location);
    }

    componentDidMount(){
        //console.log("ST1", this.props.location);
        if ('NEW' === this.props.match.params.id){
            this.setState({
                isNew: true, 
                student: {},
                //isEditing: true,
            });
            return;
        }
        this.setState({
            isNew: false,
        });
        fetchStudentById(this.props.match.params.id).then(response => {
            console.log(response);
            this.setState({
                student: response.data,
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
        console.log("Student-Edit-2", this.props.history);
        return (
            <div>
                <WrappedStudentEditForm passdownState={this.state} passdownId={this.props.match.params.id} passdownHistory={this.props.history}/>
            </div>
        );
    }
}