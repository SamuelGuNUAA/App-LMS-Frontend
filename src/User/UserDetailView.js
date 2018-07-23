import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { fetchUserAdminInfo, fetchUserGeneralInfo } from '../api/user';


export default class UserDetailView extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            UserName:'',
            UserInfo:[],
        };
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({ UserName: id});
        console.log("Lecturer-1", this.props.match);
        
        if (id !== undefined){
            this.setState({
                //Set status to loading
                isLoading: true,
            });
            let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};

            if (id === 'admin'){
                //Get admin info             
                fetchUserAdminInfo(jwt).then(response => {
                    console.log("admin info", response);
                    this.setState({
                        UserInfo: response.data,  //get course detail
                        isLoading: false,       //loading done
                    });
                }).catch(e => {
                    console.log("admin info", e);
                    this.setState({
                        isLoading: false,   //loading done
                    });
                });
            }else{
                //Get general user info             
                fetchUserGeneralInfo(id, jwt).then(response => {
                    console.log("general info", response);
                    this.setState({
                        UserInfo: response.data,  //get course detail
                        isLoading: false,       //loading done
                    });
                }).catch(e => {
                    console.log("general info", e);
                    this.setState({
                        isLoading: false,   //loading done
                    });
                });
            }
        }
    }

    render(){
        console.log("Lecturer-DM-R", this.props.location);
        //render "Loading" before setState callback
        const UserName = this.state.isLoading ? "Loading" : this.state.UserName;
        const UserInfo = this.state.isLoading ? "Loading" : this.state.UserInfo;
        return (
            <div>
                <h2 style = {{paddingTop: 20, paddingBottom: 50}}>{`${UserName} detail`}</h2>
                <Card title={`User Name: ${UserInfo.UserName}`} bordered={true} style={{ background: '#ECECEC' }} >
                    <p>{`Address: ${UserInfo.Address}`}</p>
                    <p>{`Email: ${UserInfo.Email}`}</p>
                    <p>{`PhoneNumber: ${UserInfo.PhoneNumber}`}</p>
                    <p>{`IsAdmin: ${UserInfo.IsAdmin}`}</p>
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