import {combineReducers} from 'redux';
import products from './products';
import isLoggedIn from './isLoggedIn';

export default combineReducers({isLoggedIn, products});