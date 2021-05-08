import React from 'react';
import '../../App.css';
const Navbar=()=>{
    return(
	<div className="container">
		<h1 className="row">
			 
		TODO APP
			 
		</h1>
		<br/><br/>
		<div className="row">
			<form className="form-inline col-sm-offset-3">
				<div className="input-group">
					<span className="input-group-addon">
					<i className="glyphicon glyphicon-pencil"></i>
					</span>
					<input type="text" className="form-control"
						placeholder="todo-item"
						id="box"  />
				</div>
				<div classNameName="form-group">
					<input type="button"
						className="btn btn-primary form-control"
						value="add" 
						onclick="add_item()" />
				</div>
			</form>
		</div>
		<div className="row">
			<ul id="list_item">
			</ul>
		</div>
	</div>
    );
}
export default Navbar;