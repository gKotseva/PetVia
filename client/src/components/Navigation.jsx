import './Navigation.modules.css';

import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { Form } from './Form';
import { Modal } from './Modal';
import { useState } from 'react';

export function Navigation() {
    const { user, logout } = useUser();
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
                <img src="/petVIA-logo.png" alt="Logo" />
            </div>
            <div className="navigation-links-container">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    {!user ? (
                        <>
                            <li onClick={() => openModal("login")}>Login</li>
                            <li onClick={() => openModal("register")}>Register</li>
                        </>
                    ) : (
                        <>
                            <li><Link to='/my-profile'>Profile</Link></li>
                            <li onClick={logout}>Logout</li>
                        </>
                    )}
                </ul>
                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <Form formName={formName} closeModal={closeModal} openModal={openModal}/>
                    </Modal>
                )}
            </div>
        </div>
    );
}

