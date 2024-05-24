import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const Notification = ({ show, onClose, message }) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        let timer;
        if (show) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, 7000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [show, onClose]);

    return (
        <ToastContainer
            position="top-end" className="p-3">
            <Toast onClose={() => setVisible(false)} show={visible} delay={7000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Notification;
