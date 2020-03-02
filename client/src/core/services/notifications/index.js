import Dialog from '../dialog/DialogService';
import Component from './component';

// just a simple error message
export function showError(data, res = data) {
    Dialog.show(Component, {rejectLabel: 'ok', ...data});
    return Promise.reject(res);
}

export function showMessage(data) {
    return Dialog.show(Component, {resolveLabel: 'ok', ...data});
}