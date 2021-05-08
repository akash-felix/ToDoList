import React from 'react';
import { connect } from 'react-redux';
import { getitem } from '../../../actions/item';

const Getone=({getitem,item})=>{
    
    getitem();
    console.log(item);
    return(
        <div>
            {item.item}
        </div>
    )
}
const mapStateToProps=state=>({
    item:state.item
})
export default connect(mapStateToProps,{getitem}) (Getone);