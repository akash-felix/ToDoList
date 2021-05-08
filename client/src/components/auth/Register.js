import React from 'react';
import { Fragment,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
const Register=({setAlert,register,isAuthenticated})=>{
    const [formData,setFormData]=useState({
        firstname:'',
        lastname:'',  
        email:'',
        mobilenumber:'',
        password:'',
        password2:''
    });
    const {firstname,lastname,email,mobilenumber,password,password2}=formData;
    const onChange=e=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onSubmit=async e=>{
        e.preventDefault();
        if(password!==password2){
            setAlert('Passwords do not match','danger');
        }
        else{
           register({firstname,lastname,email,mobilenumber,password});
        }
    };
    if(isAuthenticated){
      return <Redirect to='/dashboard'/>
    }
    return (
        <Fragment>
            <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="first name" 
          name="firstname"
          value={firstname} 
          onChange={e=>onChange(e)}
           />
        </div>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="last name" 
          name="lastname"
          value={lastname} 
          onChange={e=>onChange(e)}
           />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="tel" placeholder="Mobile Number"name="mobilenumber" value={mobilenumber} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>{onChange(e)}}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e=>{onChange(e)}}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
        </Fragment>
    );
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps,{setAlert,register})(Register);
