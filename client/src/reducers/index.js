import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import list from './item';
export default combineReducers({
    alert,
    auth,
    list
});