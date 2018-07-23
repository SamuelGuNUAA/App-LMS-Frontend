import axios from 'axios';

export function fetchLecturers(){
    //return axios.get('https://testfullstack.azurewebsites.net/api/courses');
    return axios.get('/lecturer');
}

export function fetchLecturerById(id){
    return axios.get(`/lecturer/${id}`);
}

export function saveLecturer(data, headers){
    return axios.post('/lecturer', data, {headers});
}

export function updateLecturer(id, data){
    return axios.put(`/lecturer/${id}`, data);
}

export function deleteLecturer(id, headers){
    return axios.delete(`/lecturer/${id}`, {headers});
}