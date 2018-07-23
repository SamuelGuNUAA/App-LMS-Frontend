import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon} from 'antd';

import '../App.css';
import imgURL_JR from '../jiangren.png';

class HeaderRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: '',    //default home page
            loginRole: '',
        }
        
    }

    handleClick = (e) => {
        console.log('click ', e);
        if(e.key === 'Login'){
            console.log(this.state.loginRole);
            //this.props.history.push("/");
        }
        if(e.key === 'Logout'){
            console.log(this.state.loginRole);
                sessionStorage.setItem('loginRole', 'visitor');
                sessionStorage.setItem('token', '');
                this.setState({loginRole: 'visitor'});
            
            this.props.history.push("/");
        }
        
        /*
        this.setState({
            current: e.key,
        });
        */
    }

    componentDidMount(){
        //console.log("SGG-1",this.props.history);
        //this.props.history.push('/courses');   //refresh default to home page
        let loginRole = sessionStorage.getItem('loginRole');
        console.log("loginRole:",loginRole);
        if (loginRole === null || loginRole === "visitor"){
            sessionStorage.setItem('loginRole', 'visitor');
            this.setState({
                loginRole: 'visitor',
            });
            
        }
    }

    render(){
        const { Header } = Layout;

        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <img className="logo" src={imgURL_JR} />
                <Menu
                    theme= "dark"
                    selectedKeys={this.state.current} 
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    onClick={this.handleClick} >
                    <Menu.Item key="home">
                        <Link to="/"></Link>
                        <Icon type="home" />Home  
                    </Menu.Item>
                    <Menu.Item key="course">
                        <Link to="/courses"></Link>
                        <Icon type="book" />Course  
                    </Menu.Item>
                    <Menu.Item key="student" >
                        <Icon type="user" />Student
                        <Link to="/students"></Link>
                    </Menu.Item>
                    <Menu.Item key="lecturer" >
                        <Icon type="android" />lecturers
                        <Link to="/lecturers"></Link>
                    </Menu.Item>
                    <Menu.Item key="Login" style={{float:'right', display: (sessionStorage.getItem('loginRole') === 'visitor') ? 'block' : 'none'}}>
                        <Icon type="login" />Login
                        <Link to="/user/login"></Link>
                    </Menu.Item>
                    <Menu.Item key="Logout" style={{float:'right', display: (sessionStorage.getItem('loginRole') === 'visitor') ? 'none' : 'block'}}>
                        <Icon type="login" />{`Logout (${sessionStorage.getItem('loginRole')})`}
                        <Link to="/"></Link>
                    </Menu.Item>
                </Menu>
            </Header>

        )
    }
}

//get access to match, location and history
const Header = withRouter(HeaderRouter);
export default Header;