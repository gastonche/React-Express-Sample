import api from '../../../core/servers/api';
import {handle, waiting } from '../../../core/services/http';
import Dialog from '../../../core/services/dialog/DialogService';
import CreateAndEditDialog from '../dialogs/CreateAndEditProduct.dialog';
import { showMessage } from '../../../core/services/notifications';

export function loadProducts() {
    return handle(waiting(api.get('products')));
}

export function addProduct() {
    return Dialog.show(CreateAndEditDialog)
        .then(({product}) => handle(waiting(api.post('products', product))));
}

export function edit(product) {
    return Dialog.show(CreateAndEditDialog, {product})
        .then(({product}) => handle(waiting(api.put(`products/${product._id}`, product))));
}

export async function dropProduct(product) {
    await showMessage({
        title: 'Delete?',
        message: `Are you sure you want to delete this product?`,
        resolveLabel: 'Yes, Delete',
        rejectLabel: 'No, Cancel',
    });

    return handle(waiting(api.delete(`products/${product._id}`)))
}

export function loadDefault() {
    return handle(waiting(api.post(`products/default`)))
}