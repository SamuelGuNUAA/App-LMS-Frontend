import axios from 'axios';

export function fetchUsers(){
    //return axios.get('https://testfullstack.azurewebsites.net/api/courses');
    return axios.get('/user');
}

export function fetchUserAdminInfo(headers){
    return axios.get(`/user/adminInfo`, {headers});
}

export function fetchUserGeneralInfo(id, headers){
    return axios.get(`/user/generalInfo/${id}`, {headers});
}

export function saveUserInitial(data){
    return axios.post('/user/initial', data);
}

export function checkUserLogin(data){
    return axios.post('/user/login', data);
}

export function updateUser(id, data){
    return axios.put(`/user/${id}`, data);
}

