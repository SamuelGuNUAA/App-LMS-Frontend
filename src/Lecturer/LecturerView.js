import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { List, Avatar, Button, Icon, Popover, Modal } from 'antd';
import { fetchLecturers, deleteLecturer } from '../api/lecturer';

import imgURL_JR from '../jiangren.png';

const confirm = Modal.confirm;

class LecturerViewRouter extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            loginRole: 'visitor',
            lecturers: [],
        };
    }

    componentDidMount(){
        console.log('SG-lecturer');
        //before request API
        this.setState({
            isLoading: true,
            loginRole: sessionStorage.getItem('loginRole')
        });
        //starting request API
        fetchLecturers().then(response => {
            console.log("S-Lecturer",response);
            this.setState({
                lecturers: response.data,
                isLoading: false,   //DONE
            });
        }).catch(e => {
            console.log(e);
        });
    }

    deleteConfirm(LecturerId){
        console.log(LecturerId);
        //console.log(this.state.refreshFlag);
        var _this=this;
        
        confirm({
            title: 'Are you sure delete this course?',
            content: 'It can not be restored!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
                deleteLecturer(LecturerId, jwt).then(response => {
                    console.log(response);
                    //this.props.history.push("/courses");
                }).catch((e) => {
                    console.log(e);
                    alert(e);
                    //this.props.rerender(false);
                    _this.props.history.go('/lecturers');
                    
                }); 
            },
            onCancel() {
                console.log('Cancel');
                //_this.props.history.push('/courses');
                _this.props.history.go('/lecturers');    
            },
        });  
    }

    render(){
        const data = this.state.lecturers;  
        return (
            <div>
                <div style={{paddingBottom: 20, display: (sessionStorage.getItem('loginRole') === 'admin') ? 'block' : 'none'}}>
                <Link to={`/lecturers/edit/NEW`} >
                    <Button icon='plus' type="primary">
                        New Lecturer
                    </Button>
                </Link>
                </div>
                <List
                    itemLayout="horizontal"
                    pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 8,
                      }}
                    dataSource={data}
                    
                    renderItem={item => (
                        
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={imgURL_JR} />}
                                title={<Link to={`/lecturers/${item.LecturerId}`}>{`Lecturer ID: ${item.LecturerId}`}</Link>}
                                description={`Name: ${item.Name}`}

                            />
                            <div style={{padding: 10}}>Salary: {item.Salary}</div>
                            <Link to={`/lecturers/edit/${item.LecturerId}`}>
                                <Popover content="Edit lecturer" trigger="hover">
                                    <Icon type="edit" style={{padding: 10}}/>
                                </Popover>
                            </Link>
                            
                            <Popover content="Delete lecturer" trigger="hover">
                                <Icon type="delete" style={{padding: 10}} onClick={()=>{ this.deleteConfirm( item.LecturerId )}}/>
                            </Popover>
                            
                        </List.Item>
                        
                    )}
                />
            </div>
        )
    }
}

const LecturerView = withRouter(LecturerViewRouter);
export default LecturerView;