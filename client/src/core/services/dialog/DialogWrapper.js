import React from 'react';

export default function ({header, footer, body, children, onClose}) {
    return <div className="dialog-frame">
        <div className="top">
            {header? <div className="default-dialog-header">{header}</div>: ''}
            {onClose? <i className="material-icons dialog-closer" onClick={onClose}>close</i>: ''}
        </div>
        {body? <div className="default-dialog-body">{body}</div>: ''}
        {footer? <div className="default-dialog-footer">{footer}</div>: ''}        
        {children}
    </div>
}