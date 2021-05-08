import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { additem, deleteitem, getitems } from '../../actions/item';
import '../../App.css';

const Dashboard=({additem,logout,text:{lists},getitems,auth:{user},deleteitem})=>{
	useEffect(()=>{
        getitems();
    },[]);
	const [formData,setFormData]=useState({
	});
	const {item}=formData;
	const onchange=e=>{
		setFormData({...setFormData,[e.target.name]:e.target.value});
	}
	const onsubmit=e=>{
		e.preventDefault();
		additem({item});
	}
	const onhit=id=>{
		deleteitem(id);
	}
    return(
		
	<div className="container">
		<i className="fas fa-user"></i>Welcome {user && user.firstname}
        <Link to='/' onClick={()=>{logout()}}>
          <i className="fas fa-sign-out-alt" />
          Logout
        </Link>
		<h1 className="row">
			 
		TODO APP
			 
		</h1>
		<br/><br/>
		<div className="row">
			<form className="form-inline col-sm-offset-3" onSubmit={e=>{onsubmit(e)}}>
				<div className="input-group">
					<span className="input-group-addon">
					<i className="glyphicon glyphicon-pencil"></i>
					</span>
					<input type="text" className="form-control"
						placeholder="todo-item"
						value={item}
						name="item"
						onChange={e=>onchange(e)}  />
				</div>
				
				<div className="form-group">
					<input type="submit"
						className="btn btn-primary form-control"
						value="Add" 

						/>
				</div>
			</form>
		</div>
		<div>
            <div className='form' >
                  {lists && lists.map(list=>(
                      <div>
						<input key={list.key} type="text" className="form-control"
						placeholder="todo-item"
						value={list.item}
						name="item"
						/>
                        <div >
					<Link className="btn btn-primary" to={`/${list._id}`}>Edit</Link>
						<input type="button"
						className="btn btn-danger"
						value="Delete"			
                         onClick={e=>onhit(list._id)}
						/>
						</div>
                        </div>))}
                        </div>
						
        </div>
        
	</div>
	
    )
	}
const mapStateToProps=state=>({
	text:state.list.items,
	auth:state.auth
})
export default connect(mapStateToProps,{additem,logout,getitems,deleteitem})(Dashboard);