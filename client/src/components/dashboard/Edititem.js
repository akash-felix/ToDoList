import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { edititem, getitem } from '../../actions/item';


const Edititem=({match,getitem,itemsm,edititem})=>{
    useEffect(()=>{
        getitem(match.params.id);
    },[]);
   // useEffect(()=>{
     //  return itemm=itemsm.item;
    //},[]);
    const[data,setdata]=useState ({
        itemm:itemsm.item
    });
    console.log(itemsm.item);
    const {itemm}=data;
    const onchange=e=>{
        setdata({...setdata,itemm:e.target.value});
    }
    const onclick=(e)=>{
       const id=match.params.id;
        console.log(itemm,id);
        edititem({id,itemm});
    }
    return(
        <div>
            <input  type="text" className="form-control"
						placeholder="todo-item"
						value={itemm}
						name="item"
                        onChange={e=>onchange(e)}
						/>
                        <input  type="submit" 
						value="Update"
                        onClick={e=>onclick(itemsm._id)}
						/>
            <Link to='/dashboard'>dashboard</Link>
            </div>
        
    )
    
}
const mapStateToProps=(state)=>({
    itemsm:state.list.text
});
export default  connect (mapStateToProps,{getitem,edititem})(Edititem);