import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { Card, Icon, Col, Modal, Popover} from 'antd';
import { deleteCourse } from '../api/course';

import imgURL_JR from '../jiangren.png';

const confirm = Modal.confirm;

class CourseCardRouter extends Component{
    constructor(props){
        super(props);
        this.state=({
            refreshFlag: false,
        });
    }

    changeStatus(){
        this.setState({
            refreshFlag: !this.state.refreshFlag
        });
    }

    deleteConfirm(CourseId){
        //console.log(CourseId);
        var _this=this;
        
        confirm({
            title: 'Are you sure delete this course?',
            content: 'It can not be restored!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let jwt = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
                deleteCourse(CourseId, jwt).then(response => {
                    console.log(response);
                    //this.props.history.push("/courses");
                }).catch((e) => {
                    console.log(e);
                    alert(e);
                    //this.props.rerender(false);
                    _this.props.history.go('/courses');
                    
                }); 
            },
            onCancel() {
                console.log('Cancel');
                //_this.props.history.push('/courses');
                _this.props.history.go('/courses');    
            },
        });  
    }

    render(){
        const { Meta } = Card;
        const {CourseId, Name} = this.props.lesson;

        return (
            <Col span={6}>
                <Card
                    style={{ width:250, margin:20 }}
                    cover={<img alt="example" src={imgURL_JR} style={{width: 50, float: 'right', padding: 10 }}/>}
                    actions={[
                        <Link to={`/courses/${CourseId}`} >
                            <Popover content="Course detail" trigger="hover">
                                <Icon type="ellipsis" />
                            </Popover>    
                        </Link>, 
                        <Link to={`/courses/edit/${Name}`} >
                            <Popover content="Add to my course" trigger="hover">
                                <Icon type="plus-circle-o" />
                            </Popover>    
                        </Link>,
                        <Link to={`/courses/edit/${CourseId}`} >
                            <Popover content="Edit course" trigger="hover">
                                <Icon type="edit" />
                            </Popover>
                        </Link>,
                        <Popover content="Delete course" trigger="hover"> 
                            <Icon type="delete" onClick={()=>{ this.deleteConfirm( CourseId )}} />
                        </Popover>    
                    ]}
                >
                <Meta
                    title={Name}
                    description={`Course ID: ${CourseId}`}   
                />
                </Card>
            </Col>

        );
    }
}

const CourseCard = withRouter(CourseCardRouter);
export default CourseCard;
