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

const getAllCodeService = (inputType) =>{
    return axios.get(`/api/allcodes?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) =>{
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailInforDoctor = (inputId) =>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
export {
    handleLoginApi, 
    getAllUsers, 
    createNewUserService, 
    deleteUserService, 
    editUserService, 
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor
}