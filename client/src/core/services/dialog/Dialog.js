import React from 'react';
import ReactDOM from 'react-dom';
import './dialog.css';

const DialogComponent  = (props) => 
    <div className="dialog-wrapper">
        <div className="dialog">
            <props.component hide={props.hide} cancel = {props.cancel} {...props.props}/>
        </div>
    </div>


export default class Dialog {

    constructor(parent, component, props) {
        this.$el = this.createEl(parent);
        this.component = component;
        this.props = props;
        this.$promise = new Promise((resolve, reject) => {
            this.$$resolve = resolve;
            this.$$reject = reject;
        });
    }

    createEl(parent) {
        const el = document.createElement('div');
        parent.appendChild(el);
        return el;
    }

    hide(reason) {
        return this.$$resolve(reason);
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.$el);
    }

    show() {
        ReactDOM.render(<DialogComponent props={this.props} component={this.component} hide={reason => this.hide(reason)} cancel={reason => this.cancel(reason)} />, this.$el);
        return this.$promise;
    }

    cancel(reason) {
        return this.$$reject(reason);
    }
}