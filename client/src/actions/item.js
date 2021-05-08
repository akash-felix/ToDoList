import axios from 'axios';
import { setAlert } from './alert';
import {ADD_ITEM,ITEM_FAILED,GET_ITEMS,EDIT_ITEM,GET_ITEM, DELETE_ITEM} from './types';
//get items
export const getitems=()=>async dispatch=> {
    try {
        const res=await axios.get('/api/list');
        dispatch({
            type:GET_ITEMS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:ITEM_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
//add item
export const additem=({item})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({item});
    try {
        const res=await axios.post('/api/list',body,config);
        dispatch({
            type:ADD_ITEM,
            payload:res.data
        });
        dispatch(setAlert('Post Created','success'));
        dispatch(getitems());
    } catch (err) {
        dispatch({
            type:ITEM_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
//edit item
export const edititem=({id,item})=> async dispatch=>{
    const config={
        headers:{
          'Content-Type':'application/json'
        }
      };
      //const body=JSON.stringify({item});
    try {
        const res =await axios.put(`api/list/${id}`,item,config);
        dispatch({
            type:EDIT_ITEM,
            payload:res.data
        });
    } catch (err) {
        console.log('error');
        dispatch({
            type:ITEM_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
//get single item
export const getitem=(id)=> async dispatch=>{
    try {
        const res=await axios.get(`/api/list/${id}`);
        dispatch({
            type:GET_ITEM,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:ITEM_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
export const deleteitem=(id)=> async dispatch=>{
    try {
        await axios.delete(`/api/list/${id}`);
        dispatch({
            type:DELETE_ITEM,
            payload:id
        });
        dispatch((setAlert('Deleted','success')));
        dispatch(getitems());
    } catch (err) {
        dispatch({
            type:ITEM_FAILED,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}