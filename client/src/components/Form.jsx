import React from 'react';
import { login, register } from '../handlers/userHandlers';
import { useForm } from '../hooks/useForm';
import './Form.modules.css';

export function Form({ formName, closeModal, openModal }) {
    const handler = formName === 'login' ? login : formName === 'register' ? register : null;
    const initialValues =
        formName === 'login' ? { email: '', password: '' } : 
        formName === 'register' ? { firstName: '', lastName: '', email: '', mobilePhone: '', password: '', confirmPassword: '' } : {};

    const { values, errors, success, successMessage, onChange, onSubmit } = useForm(handler, initialValues, formName, closeModal, openModal);

    const forms = {
        login: [
            { type: "email", label: "Email", name: 'email' },
            { type: "password", label: "Password", name: 'password' }
        ],
        register: [
            { type: "text", label: "First Name", name: 'firstName' },
            { type: "text", label: "Last Name", name: 'lastName' },
            { type: "email", label: "Email", name: 'email' },
            { type: "text", label: "Mobile Phone", name: 'mobilePhone' },
            { type: "password", label: "Password", name: 'password' },
            { type: "password", label: "Repeat Password", name: 'confirmPassword' }
        ]
    };

    return (
        <div className="form-container">
            <h2 className='form-heading'>{formName}</h2>
            <form onSubmit={onSubmit}>
                {forms[formName].map(el => (
                    <div key={el.name}>
                        <label>{el.label}</label>
                        <input type={el.type} name={el.name} value={values[el.name]} onChange={onChange}></input>
                    </div>
                ))}
                <button className='custom-button'>{formName === "login" ? "Login" : "Register"}</button>
            </form>
        </div>
    );
}
