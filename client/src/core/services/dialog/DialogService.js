import Dialog from './Dialog';

export class DialogService {
    constructor(el = 'dialogs-container') {
        this.$$dialogs = [];
        this.$el = document.getElementById(el);
    }

    async show(component, props) {
        const dialog = new Dialog(this.$el, component, props);
        this.$$dialogs.push(dialog);
        try {
            const reason = await dialog.show();
            return this.hide(reason);
        }
        catch (e) {
            return this.cancel(e);
        }
    }

    close() {
        const dialog = this.$$dialogs.pop();
        dialog.close();
    }

    hide(reason) {
        this.close();
        return Promise.resolve(reason);
    }

    cancel(reason) {
        this.close();
        return Promise.reject(reason);
    }
}

export default new DialogService();