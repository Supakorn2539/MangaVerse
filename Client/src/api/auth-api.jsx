import axios from 'axios'
const ACCESS_TOKEN = 'ACCESS_TOKEN';

const token = localStorage.getItem(ACCESS_TOKEN);


export const register = async(form) => {
    return axios.post('http://localhost:8000/auth/register',form)
}

export const login = async(form) => {
    return axios.post('http://localhost:8000/auth/login',form)
}

export const getMe = async() => {
    return axios.get('http://localhost:8000/auth/current-user',{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}