import React from "react";
import './Modal.css'

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <button onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}