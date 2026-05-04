import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService } from '../../services/userService';//gọi hàm xử lý việc gọi api 
import { dispatch } from '../../redux';
import {toast} from 'react-toastify'
import { act } from 'react';

//action cần type là tên của action đã khai
//=================================================FETCH GENDER=========================================
export const fetchGenderStart = () =>{
    //gọi cú pháp dispatch và getState, trả về 1 arrow function, đặt 1 biến gọi hàm getAllCodeService
    //kiểm tra biến nếu như biến không có lỗi (errCode === 0) thì gọi fetch success ngược lại nếu có lỗi gọi fetch failed
    //đưa về catch để bắt lỗi truyền vào fetch failed vào catch
    return async(dispatch, getState) =>{
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let response = await getAllCodeService('GENDER')
            if(response && response.errCode === 0){
                // console.log('Check get state: ', getState)
                dispatch(fetchGenderSuccess(response.data))
            }else{
                dispatch(fetchGenderFailed())

            }
        }
        catch(e){
            dispatch(fetchGenderFailed())
            console.log('Fetch gender start error', e)
        }
    }
}

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START 
// })


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData

})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


//=================================================FETCH POSITION=========================================
export const fetchPositionStart = ()=> {
    return async (dispatch, getState) =>{
        try{
            let response = await getAllCodeService('POSITION')
            if(response && response.errCode === 0){
                dispatch(fetchPositionSuccess(response.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        }
        catch(e){
            dispatch(fetchPositionFailed())

            console.log(e)
        }
    }
}
export const fetchPositionSuccess = (positionData)=> ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = ()=> ({
    type: actionTypes.FETCH_POSITION_FAILED
    
})


//=================================================FETCH ROLE=========================================

export const fetchRoleStart = () =>{
    return async(dispatch, getState)=>{
        try{
            let response = await getAllCodeService('ROLE')
            if(response && response.errCode === 0){
                dispatch(fetchRoleSuccess(response.data))
            }else{
                dispatch(fetchRoleFailed())
            }
        }
        catch(e){
            dispatch(fetchRoleFailed())
            console.log(e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

//=================================================CREATE USER=========================================

export const createNewUser = (data) =>{
    return async (dispatch, getState) =>{
        try{
            let resposne = await createNewUserService(data)
            // console.log('Check create user redux: ', resposne)
            if(resposne && resposne.errCode === 0){
                toast.success('Create a new user succeed!!!')
                dispatch(createUserSuccess())
                dispatch(fetchAllUserStart())
            }else{
                dispatch(createUserFailed())
            }
        }
        catch(e){
            dispatch(createUserFailed())

            console.log('Create user failed')
        }
    }
}

export const createUserSuccess = () =>({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})


//========================================fetch all user===============================
export const fetchAllUserStart = () =>{
    return async (dispatch, getState) =>{
        try{
            let response = await getAllUsers('ALL')
            // console.log('Check fetch all user API: ')
            if(response && response.errCode === 0){
                
                dispatch(fetchAllUserSuccess(response.users.reverse()))
            }else{
                dispatch(fetchAllUserFailed())
            }
        }catch(e){
            dispatch(fetchAllUserFailed())
            console.log(e)
        }
    }
}
export const fetchAllUserSuccess = (userData) => ({
    type: actionTypes.FETCH_ALLUSER_SUCCESS, 
    users: userData
})

export const fetchAllUserFailed = () =>({
    type: actionTypes.FETCH_ALLUSER_FAILED
})

//========================================delete user===============================
export const deleteUserStart = (userId) =>{
    return async(dispatch, getSate)=>{
        try{
            let response = await deleteUserService(userId)
            if(response && response.errCode === 0){
                toast.success('Delete user succeed!!!')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else{

                dispatch(deleteUserFailed())

            }
        }catch(e){
            toast.error('Delete user error!!!')

            dispatch(deleteUserFailed())
            console.log(e)
        }
    }
}
export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAILED
})


//Chạy đến reducer