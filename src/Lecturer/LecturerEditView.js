import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Input, Button, Form, message } from 'antd';
import { fetchLecturerById, saveLecturer, updateLecturer } from '../api/lecturer';

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

class LecturerEditForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isVerified: false,
            loginRole: 'visitor',
            Salary: '',
            lecturerId: '',
            LecturerProfile: ''
        };
    }

    _isNew(){
        return this.props.passdownState.isNew;
    }

    componentDidMount(){
        console.log("Lecturer-Edit-1");
        this.setState({ loginRole: sessionStorage.getItem('loginRole')});
        this.props.form.validateFields();
        this.setState({
            Salary: this.props.passdownState.lecturer.Salary,
            lecturerId: this.props.passdownState.lecturer.lecturerId,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            
                const dataUpdate = { LecturerId: values.LecturerId, Salary: values.Salary};
                console.log(dataUpdate);
                //check POST or PUT
                if(this._isNew()){
                    let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
                    saveLecturer(dataUpdate, jwt).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //alert("Course added successfully!");
                            message.success("Lecturer added successfully!");
                            this.props.passdownHistory.push("/lecturers");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                }else{
                    updateLecturer(this.props.passdownId, dataUpdate).then(response => {
                        console.log(response);
                        if(response.status === 200){
                            //alert("Course updated successfully!");
                            message.success("Lecturer updated successfully!");
                            this.props.passdownHistory.push("/lecturers");
                        }
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });
                    ///console.log("ST5", this.props.passdownHistory);
                    this.props.passdownHistory.push("/lecturers");
                }
                
            }
        });
    }

    //Back to student view page
    handleCancel(e){
        //Clear state and quit
        this.setState({
            isVerified: false,
            Salary: '',
            lecturerId: '',
            LecturerProfile: '',
        });
        this.props.passdownHistory.push("/lecturers");
    }

    render(){

        const { TextArea } = Input;
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const lecturerIdError = isFieldTouched('LecturerId') && getFieldError('LecturerId');
        const lecturerSalaryError = isFieldTouched('Salary') && getFieldError('Salary');
        const lecturerDescError = isFieldTouched('LecturerId') && getFieldError('LecturerId');
        //console.log("SGT3");
        const inputDisabled = this._isNew() 
                                    ? <Input placeholder={this.props.passdownState.lecturer.LecturerId} value ={this.state.LecturerId} onChange={(e) => this.setState({LecturerId:e.target.value})}/> 
                                    : <Input disabled placeholder={this.props.passdownState.lecturer.LecturerId} value ={this.state.LecturerId} onChange={(e) => this.setState({LecturerId:e.target.value})}/>;

        return(
            <div>
                <h2 style = {{paddingTop: 30, paddingBottom: 50}}>{this._isNew()? 'Create a new lecturer':'Edit a lecturer'}</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        { ...formItemLayout }
                        validateStatus={lecturerIdError ? 'error' : ''}
                        help={lecturerIdError || ''}
                        label = "Lecturer ID:"
                    >
                        {getFieldDecorator('LecturerId', {
                            rules: [{ required: true, message: 'Please input lecturer ID!' }],
                        })(
                            inputDisabled
                        )}
                    </FormItem>

                    <FormItem
                        { ...formItemLayout }
                        validateStatus={lecturerSalaryError ? 'error' : ''}
                        help = {lecturerSalaryError || ''}
                        label = "Salary:"
                    >
                        {getFieldDecorator('Salary', {
                            rules: [{ required: false, message: 'Please input lecturer salary!' }],
                        })(
                            <Input placeholder={this.props.passdownState.lecturer.Salary} value ={this.state.Salary} onChange={(e) => this.setState({Salary:e.target.value})}/>
                        )}
                    </FormItem>

                    <FormItem
                        { ...formItemLayout }
                        label = "Lecturer Profile:"
                    >

                        {getFieldDecorator('LecturerProfile', {

                        })(
                            <TextArea rows={6} placeholder={this.props.passdownState.lecturer.LecturerId} value ={this.state.LecturerId} onChange={(e) => this.setState({LecturerId:e.target.value})}/>
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
const WrappedLecturerEditForm = Form.create()(LecturerEditForm);


export default class LecturerEditView extends Component{
    constructor(props){
        super(props);
        this.state= {
            isNew: false,
            //isEditing: false,
            lecturer:[],
        };
        console.log("ST", props.location);
    }

    componentDidMount(){
        //console.log("ST1", this.props.location);
        if ('NEW' === this.props.match.params.id){
            this.setState({
                isNew: true, 
                lecturer: {},
                //isEditing: true,
            });
            return;
        }
        this.setState({
            isNew: false,
        });
        fetchLecturerById(this.props.match.params.id).then(response => {
            console.log(response);
            this.setState({
                lecturer: response.data,
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
        console.log("Lecturer-Edit-2", this.props.history);
        return (
            <div>
                <WrappedLecturerEditForm passdownState={this.state} passdownId={this.props.match.params.id} passdownHistory={this.props.history}/>
            </div>
        );
    }
}