export const SET_PRODUCTS_ACTION = 'SET',
    EDIT_PRODUCT_ACTION = 'EDIT',
    ADD_PRODUCT_ACTION = 'ADD',
    DELETE_PRODUCT_ACTION = 'DELETE',
    SIGN_IN_ACTION = 'IN',
    SIGN_OUT_ACTION = 'OUT';

export function setProducts(payload) {
    return {
        type: SET_PRODUCTS_ACTION,
        payload,
    }
}

export function signIn() {
    return {
        type: SIGN_IN_ACTION
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_ACTION
    }
}

export function addProduct(payload) {
    return {type: ADD_PRODUCT_ACTION, payload};
}


export function editAction(payload) {
    return {type: EDIT_PRODUCT_ACTION, payload};
}


export function deleteAction(payload) {
    return {type: DELETE_PRODUCT_ACTION, payload};
}