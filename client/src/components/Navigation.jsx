import './Navigation.modules.css';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Form } from './Form';
import { Modal } from './Modal';
import { useEffect, useState } from 'react';

export function Navigation() {
    const { auth, logout } = useAuth();
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
                <img src="/image.png" alt="Logo" />
            </div>
            <div className="navigation-links-container">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    {
                        !auth ? (
                            <>
                                <li onClick={() => openModal("login")} className='custom-button'>Login</li>
                                <li onClick={() => openModal("register")} className='custom-button'>Register</li>
                            </>
                        ) : auth.role === 'user' ? (
                            <>
                                <li><Link to='/my-profile'>Profile</Link></li>
                                <li onClick={logout} className='custom-button'>Logout</li>
                            </>
                        ) : auth.role === 'salon' && (
                            <>
                                <li><Link to='/salon-settings'>Settings</Link></li>
                                <li onClick={logout} className='custom-button'>Logout</li>
                            </>
                        )
                    }
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

