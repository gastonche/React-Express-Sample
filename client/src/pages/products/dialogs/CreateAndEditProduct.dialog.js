import React, {useState} from 'react';
import DialogWrapper from '../../../core/services/dialog/DialogWrapper';

const emptyProduct = {
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false
}

export default function CreateAndEditDialog(props) {
    let [product, setProduct] = useState({...emptyProduct, ...props.product});

    return <form onSubmit={submit}>
        <DialogWrapper onClose={props.cancel}
            header={
                <label>{product._id? `Edit ${product.name}`: 'Create New Product'}</label>
            }

            body={
                <div className="body">
                    <label htmlFor="name">
                        Product Name
                        <input type="text" value={product.name} id="name" name="name" required="required"  onChange={handleChange}/>
                    </label>
                    <label htmlFor="type">
                        Type
                        <input type="text" value={product.type} id="type" name="type" required="required" onChange={handleChange}/>
                    </label>
                    <label htmlFor="price">
                        Price($)
                        <input type="number" min="0" value={product.price} id="price" name="price" required="required"  onChange={handleChange}/>
                    </label>
                    <label htmlFor="rating">
                        Rating
                        <input type="number" max="5" min="1" value={product.rating} id="rating" name="rating" step={.1} required="required"  onChange={handleChange}/>
                    </label>
                    <label htmlFor="warranty_years">
                        Warranty Years
                        <input type="number" value={product.warranty_years} id="warranty_years" name="warranty_years" required="required"  onChange={handleChange}/>
                    </label>
                    <label htmlFor="available" className="checkbox">
                        Available?
                        <input type="checkbox" checked={product.available} id="available" name="available" onChange={handleAvailable}/>
                    </label>
                </div>
            }
            footer={
                <span>
                    <button className="button large" type="button" onClick={cancel}> Cancel </button>
                    <button className="button large main dark" data-icon="save"> Save </button>
                </span>
            }
        />
    </form>
    
    function handleChange({target: {name, value}}) {
        setProduct({
            ...product,
            [name]: value,
        })
    }

    function handleAvailable({target: {name}}) {
        setProduct({
            ...product,
            [name]: !product.available,
        })
    }

    function submit(e) {
        e.preventDefault();
        props.hide({product});
    }

    function cancel(e) {
        e.preventDefault();
        e.stopPropagation();

        props.cancel();
    }
}