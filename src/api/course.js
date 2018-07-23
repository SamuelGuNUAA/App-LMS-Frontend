import axios from 'axios';

export function fetchCourses(){
    //return axios.get('https://testfullstack.azurewebsites.net/api/courses');
    return axios.get('/course');
}

export function fetchCourseById(id){
    return axios.get(`/course/${id}`);
}

export function saveCourse(data, headers){
    return axios.post('/course', data, {headers});
}

export function updateCourse(id, data){
    return axios.put(`/course/${id}`, data);
}

export function deleteCourse(id, headers){
    return axios.delete(`/course/${id}`, {headers});
}