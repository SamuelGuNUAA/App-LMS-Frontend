import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import { checkUserLogin } from "../api/user"
const FormItem = Form.Item;

class UserLoginViewWrapped extends Component{
    constructor(props){
        super(props);
        this.state= {

        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            //POST to server
            let postLoginData = { UserName: values.userName, Password: values.password}
            console.log(postLoginData);
            checkUserLogin(postLoginData).then( response => {
              console.log( response );
              if( response.status === 200){
                message.success("Login sccussfully!");
                sessionStorage.setItem('token', response.data.Token);
                sessionStorage.setItem('loginRole', values.userName);
                //sessionStorage
                this.props.history.push("/");
              }else{
                message.error(response.data);
                this.props.history.push("/user/login");
              }
            }).catch( e => {
              console.log(e);
              //this.props.history.push("/");
            });
          }
        });
      }

    render(){
        const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Link to={`/#`} className="login-form-forgot" >Forgot password</Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={`/user/register`} >register now!</Link>
        </FormItem>
      </Form>
    );
    }
}

const UserLoginView = Form.create()(UserLoginViewWrapped);
export default UserLoginView;