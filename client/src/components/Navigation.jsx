import { useState } from 'react';
import { Form } from './Form';
import { Modal } from './Modal';
import './Navigation.modules.css';
import { Link } from 'react-router-dom';

export function Navigation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formName, setFormName] = useState("login");

    const openModal = (formType) => {
        setFormName(formType);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="navigation-container">
            <div className="navigation-logo-container">
                <img src="/logo.png" alt="Logo"/>
            </div>
            <div className="navigation-links-container">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li onClick={() => openModal("login")}>Login</li>
                    <li onClick={() => openModal("register")}>Register</li>
                    <li>Logout</li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <Form formName={formName} />
                    </Modal>
                )}
            </div>
        </div>
    );
}
