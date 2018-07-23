import axios from 'axios';

export function fetchStudents(){
    //return axios.get('https://testfullstack.azurewebsites.net/api/courses');
    return axios.get('/student');
}

export function fetchStudentById(id){
    return axios.get(`/student/${id}`);
}

export function saveStudent(data, headers){
    return axios.post('/student', data, {headers});
}

export function updateStudent(id, data){
    return axios.put(`/student/${id}`, data);
}

export function deleteStudent(id, headers){
    return axios.delete(`/student/${id}`, {headers});
}