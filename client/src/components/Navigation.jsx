import { useState } from 'react';
import { Form } from './Form'
import { Modal } from './Modal'
import './Navigation.modules.css'

export function Navigation () {
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
                <img src="./logo.png"/>
            </div>
            <div className="navigation-links-container">
                <ul>
                    <li onClick={() => openModal("login")}>Влизане</li>
                    <li onClick={() => openModal("register")}>Регистриране</li>
                    <li>Излез</li>
                </ul>

                {isModalOpen && (
                <Modal onClose={closeModal}>
                    <Form formName={formName} />
                </Modal>
            )}

            </div>
        </div>
    )
}