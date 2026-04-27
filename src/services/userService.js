import { use } from "react";
import axios from "../axios";
const handleLoginApi = (email, password)=>{
    return axios.post('/api/login', {email: email, password: password});
}

const getAllUsers = (inputId) =>{
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data)=>{
    console.log('check data from service: ',data)
    return axios.post('/api/create-new-user',data)
}
const deleteUserService = (userId)=>{
    // console.log('check data from service delete: ',)
    return axios.delete('/api/delete-user', {
        data:{
            id: userId
        }
    })
}

const editUserService = (editData) =>{
    return axios.put('/api/edit-user', editData)

}
export {handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService}