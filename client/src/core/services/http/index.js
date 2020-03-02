import Dialog from '../dialog/DialogService';
import {showError} from '../notifications';

export function waiting(promise, props) {
    Dialog.show(() => 'Loading ...', props);

    return promise.then(r => Dialog.hide(r)).catch(r => Dialog.cancel(r));
}

export function handle(promise) {
    return promise.catch(err => showError({
        title: 'An error occured!',
        message: 'an error just occured on our end. Please try again later. Sorry about the inconvenience',
    }, err));
}