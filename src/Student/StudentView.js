import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { List, Avatar, Button, Icon, Popover, Modal } from 'antd';
import { fetchStudents, deleteStudent } from '../api/student';

import imgURL_JR from '../jiangren.png';

const confirm = Modal.confirm;

class StudentViewRouter extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            students: [],
        };
    }

    componentDidMount(){
        console.log('SG-student');
        //before request API
        this.setState({
            isLoading: true,
        });
        //starting request API
        fetchStudents().then(response => {
            console.log(response.data[0].UserLS.Address);
            this.setState({
                students: response.data,
                isLoading: false,   //DONE
            });
        }).catch(e => {
            console.log(e);
        });
    }

    deleteConfirm(StudentId){
        console.log(StudentId);
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
                deleteStudent(StudentId, jwt).then(response => {
                    console.log(response);
                    //this.props.history.push("/courses");
                }).catch((e) => {
                    console.log(e);
                    alert(e);
                    //this.props.rerender(false);
                    _this.props.history.go('/students');
                    
                }); 
            },
            onCancel() {
                console.log('Cancel');
                //_this.props.history.push('/courses');
                _this.props.history.go('/students');    
            },
        });  
    }

    render(){
        const data = this.state.students;  
        return (
            <div>
                <div style={{paddingBottom: 20}}>
                <Link to={`/students/edit/NEW`} >
                    <Button icon='plus' type="primary">
                        New Student
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
                                title={<Link to={`/students/${item.StudentId}`}>{`Student ID: ${item.StudentId}`}</Link>}
                                description={`Name: ${item.UserLS.UserName}`}

                            />
                            <div style={{padding: 10}}>GPA: {item.GPA}</div>
                            <div style={{padding: 10}}>Address: {item.UserLS.Address}</div>

                            <Link to={`/students/edit/${item.StudentId}`}>
                                <Popover content="Edit course" trigger="hover">
                                    <Icon type="edit" style={{padding: 10}}/>
                                </Popover>
                            </Link>
                            
                            <Popover content="Delete course" trigger="hover">
                                <Icon type="delete" style={{padding: 10}} onClick={()=>{ this.deleteConfirm( item.StudentId )}}/>
                            </Popover>
                            
                        </List.Item>
                        
                    )}
                />
            </div>
        )
    }
}

const StudentView = withRouter(StudentViewRouter);
export default StudentView;