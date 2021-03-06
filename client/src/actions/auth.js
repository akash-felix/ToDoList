import axios from 'axios';
import {AUTH_ERROR, REGISTER_FAIL,REGISTER_SUCCESS, USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS, LOG_OUT} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { getitems } from './item';
//loadsuer
export const loaduser=()=> async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res=await axios.get('api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        }) 
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        });
    }
}

export const register=({firstname,lastname,email,mobilenumber,password})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body =JSON.stringify({firstname,lastname,email,mobilenumber,password});
    try {
        const res=await axios.post('api/users',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(loaduser());
    } catch (err) {
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg,'danger'))); 
        }    
        dispatch({
            type:REGISTER_FAIL,
        });
        }
        
    }
//log in user

export const login=({email,password})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({email,password});
    try {
    const res=await axios.post('/api/auth',body,config);
    dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    });
    dispatch(loaduser());
    dispatch(getitems());
}   
    catch (err) {
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}
//logout
export const logout=()=>dispatch=>{
    dispatch({type:LOG_OUT});
    
  };