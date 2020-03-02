import React from 'react';
import DialogWrapper from '../../../core/services/dialog/DialogWrapper';

export default function(props) {
    return (
        <DialogWrapper
            onClose={props.cancel}
            header={
                <label>{props.title}</label>
            }
            body={
                <div className="body">
                    {props.message}
                </div>
            }
            footer={
                <span>
                    {props.rejectLabel? <button className="button large" onClick={props.cancel}> {props.rejectLabel} </button>: ''}
                    {props.resolveLabel? <button className="button large dark main" onClick={props.hide}> {props.resolveLabel} </button>: ''}
                </span>
            }
        />
    )
}