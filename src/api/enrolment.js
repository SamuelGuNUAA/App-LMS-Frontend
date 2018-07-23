import axios from 'axios';

export function fetchEnrolment(){
    //return axios.get('https://testfullstack.azurewebsites.net/api/courses');
    return axios.get('/enrolment');
}

export function saveEnrolment(data){
    return axios.post('/enrolment', data);
}

export function deleteEnrolment(data){
    return axios.delete(`/enrolment`, data);
}