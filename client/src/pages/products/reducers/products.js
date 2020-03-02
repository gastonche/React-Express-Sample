import {SET_PRODUCTS_ACTION, ADD_PRODUCT_ACTION, DELETE_PRODUCT_ACTION, EDIT_PRODUCT_ACTION} from '../actions';

const productsReducer = (state = [], { type = SET_PRODUCTS_ACTION, payload}) => {
    switch(type) {
        case SET_PRODUCTS_ACTION:
            return payload;
        case ADD_PRODUCT_ACTION:
            return [...state, payload]
        case EDIT_PRODUCT_ACTION:
            return state.map(product => product._id === payload._id? payload: product);
        case DELETE_PRODUCT_ACTION: 
            return state.filter(({_id}) => _id !== payload._id);
        default:
            return state;
    }
}

export default productsReducer;