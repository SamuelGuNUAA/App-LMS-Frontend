import React, {Component} from 'react';

import { Carousel } from 'antd';
import '../App.css';
//import CourseCard from './CourseCard';
//import { Row } from 'antd';

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state=({
            LoginStatus: 'false',
        });
    }

    componentDidMount(){
        if (sessionStorage.getItem('loginRole') !== null && sessionStorage.getItem('loginRole') !== 'visitor'){
            this.setState({LoginStatus: true});
        }
    }

    render(){

        return (
            <Carousel autoplay>
            <div>
                <h1>Welcome to Jiangren learning management system</h1>
                <h3>1</h3>
            </div>
            <div>
                <h1>We have excelent courses for you</h1>
                <h3>2</h3>
            </div>
            
            <div>
                <h1>We have experienced teachers here</h1> 
                <h3>3</h3>
            </div>
            </Carousel>
        );
    }
}