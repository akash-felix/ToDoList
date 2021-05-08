import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getitems } from '../../actions/item';
import Edititem from './Edititem';


const Items=({text:{lists},getitems})=>{
    useEffect(()=>{
        getitems();

    },[]);
    const [change,setchange]=useState({
     item:''
    });
    const {item}=change;
   const  onclick=e=>{
    <div><Edititem/></div>
    }
    const onhit=e=>{
        <div><Edititem/></div>
    }
    return (
        <div>
            <div className='form' >
                  {lists && lists.map(list=>(
                      <div>
						<input key={list.key} type="text" className="form-control"
						placeholder="todo-item"
						value={list.item}
						name="item"
                        onClick={onclick}
						/>
                        <div className="form-group">
					<input type="button"
						className="btn btn-primary form-control"
						value="Edit"
                         onClick={e=>onhit(e)}
						/><div></div></div>
                        </div>))}
                        </div>

        </div>
        
    );
    }

const mapStateToProps=state=>({
    text:state.list.items
})
export default connect (mapStateToProps,{getitems}) (Items);