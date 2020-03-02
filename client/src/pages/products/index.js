import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { loadProducts, addProduct, edit, dropProduct, loadDefault } from './services/products.service';
import { setProducts, addProduct as addAction, editAction, deleteAction, signIn } from './actions';
import io from 'socket.io-client';
import { SERVER_URL } from '../../core/servers/api';
import Product from './product';
import toastr from '../../core/services/toastr';

import './products.css';
import { login } from '../../core/services/auth.service';

export default function() {
    const {isLoggedIn, products}  = useSelector(state => state);
    const dispatch = useDispatch();
    const socket = io(SERVER_URL);

    useEffect(() => { 
        loadProducts().then(p => dispatch(setProducts(p)));
    }, [dispatch]);

    useEffect(() => {
        socket.on('products/add', product => {
            dispatch(addAction(product));
            toastr.success('New product has been added', 'Saved');
        });
        socket.on('products/edit', product => {
            dispatch(editAction(product));
            toastr.success('A product on the list has been updated', 'Updated');
        });
        socket.on('products/delete', product => {
            dispatch(deleteAction(product));
            toastr.success('One of the products have been deleted from the list', 'Deleted');
        });
        socket.on('products/set', data => dispatch(setProducts(data)));
    }, [socket, dispatch]);

    return (
        <div className="products-page">
            {!isLoggedIn? (
                <div className="box info">
                    <i className="material-icons">info</i>
                    You wil need to log in to be able to add, edit or delete products from this list.
                </div>
            ): (
                <div className="flex space-between header">
                    <h2>Products Catalog</h2>
                    <button className="button main large dark" data-icon="add" onClick={() => addProduct(dispatch)}>Create Product</button>
                </div>
            )}

            <div className="products">
                {products.map(product => <Product 
                    isLoggedIn={isLoggedIn} 
                    {...product} 
                    key={product._id} 
                    onEdit={() => onEdit(product)} 
                    onDelete={() => onDelete(product)}
                />)}
                {products.length === 0? (
                    <div className="empty">
                        <h3>No Products at the moment</h3>
                        <p>
                            Right now there are no products listed in for you to see. You can however load our list of default products to get a taste of our catalog.
                            {!isLoggedIn? 'Login to be able to load the default list of products from out cataloig': ''}
                        </p>
                        {isLoggedIn? 
                            <button className="button main large dark" onClick={loadDefault}>Load Default Products</button>: 
                            <button className="button main large dark" onClick={auth} data-icon="lock">Login</button>
                        }                        
                    </div>
                ): ''}
            </div>
        </div>
    );
    

    function onEdit(product) {
        return edit(product);
    }

    function onDelete(product) {
        return dropProduct(product);
    }

    function auth() {
        return login().then(() => dispatch(signIn()))
    }
}
