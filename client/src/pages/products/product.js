import React from 'react';

export default ({name, type, price, rating, warranty_years, available, isLoggedIn, onEdit, onDelete}) => {
    return <div className="product">
        {isLoggedIn? (
            <div className="actions flex">
                <i className="material-icons" onClick={onEdit}>edit</i>
                <i className="material-icons" onClick={onDelete}>delete</i>
            </div>
        ): ''}
        <h4>{name}</h4>
        <div className="data">
            <div className="label">Type</div>
            <div className="value">{type}</div>
        </div>
        <div className="data">
            <div className="label">Rating</div>
            <div className="value">{rating}</div>
        </div>
        <div className="data">
            <div className="label">Price</div>
            <div className="value">${price}</div>
        </div>
        <div className="data">
            <div className="label">Warranty</div>
            <div className="value">{warranty_years} Year{warranty_years > 1? 's': ''}</div>
        </div>
        <div className="data">
            <div className="label">Availability</div>
            <div className="value">{available? 'available': 'not available'}</div>
        </div>
    </div>
}