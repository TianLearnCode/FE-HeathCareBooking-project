import { act } from 'react';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [], // state lưu giới tính
    roles: [],// state role
    positions: [],//...
    users: [],
    topDoctor: [],
    allDoctors: []
}

const adminRecuder = (state = initialState, action) => {
    switch (action.type) {
        //=======================case gender=======================
        case actionTypes.FETCH_GENDER_START:
            let copyStateGender = {...state}
            copyStateGender.isLoadingGender  = true
            // console.log('Fire fetch gender start', action)
            return {
                ...copyStateGender,
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
             //state = initState mà initState có genders[], roles[], positions[]
            state.genders = action.data;
            state.isLoadingGender  = false; //mustate

            // console.log('Fire fetch gender success', action)

            return{
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            // console.log('Fire fetch gender failed', action)
            state.isLoadingGender  = false;
            state.genders = [];
            return{
                ...state
            }
        //==============case position=====================


        case actionTypes.FETCH_POSITION_START:
            // console.log('Fire fetch position start', action)
            
            return{
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = {...state}
            copyStatePosition.positions = action.data
            // console.log('Fire fetch position success', copyStatePosition)

            return{
                ...copyStatePosition
            }
        case actionTypes.FETCH_POSITION_FAILED:
            // console.log('Fire fetch position failed', action)
            return{
                
                ...state
            }

        //==============case role=====================
        case actionTypes.FETCH_ROLE_START:
            console.log('Fire fetch role start', action)
            return{
                ...state
            }
        
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = {...state}
            copyStateRole.roles = action.data
            // console.log('Fire fetch role success', copyStateRole)

            return{
                ...copyStateRole
            }
        case actionTypes.FETCH_ROLE_FAILED:
            // console.log('Fire fetch role failed ', action)
            return{
                ...state
            }
        //======================case fetch user===================================
        case actionTypes.FETCH_ALLUSER_SUCCESS:
            console.log('Fire fetch user data table success ', action)
            state.users = action.users
            return{
                ...state
            }
        case actionTypes.FETCH_ALLUSER_FAILED:
            console.log('Fire fetch user data table failed ', action)
            state.users = []
            return{
                ...state
            }
        //================================case doctor===================================
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            console.log('Fire fetch top doctor success ', action)
            state.topDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            console.log('Fire fetch top doctor failed ', action)
            state.topDoctor = [];
            return{
                ...state
            }

        //=================case all doctor===========================
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            console.log('Fire fetch all doctor success ', action)
            state.allDoctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            console.log('Fire fetch all doctor failed ', action)
            state.allDoctors = [];
            return{
                ...state
            }
        default:
            return state;
    }
}



export default adminRecuder;