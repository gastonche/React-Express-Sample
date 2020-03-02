import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {login, signup, logout} from '../services/auth.service.js';
import { signIn, signOut } from '../../pages/products/actions/index.js';

export default function() {
    const isLoggedIn  = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    return <nav className="nav public">
        <h3>ProductR</h3>
        {!isLoggedIn? 
            (
                <ul className="nav items">
                    <li onClick={() => login().then(getIn)}>Login</li>
                    <li onClick={() => signup().then(getIn)}>Sign Up</li>
                </ul>
            ): 
            (
                <ul className="nav items">
                    <li onClick={() => logout().then(getOut)}>Logout</li>
                </ul>
            )
        }
    </nav>

    function getIn() {
        dispatch(signIn());
    }

    function getOut() {
        dispatch(signOut());
    }
}