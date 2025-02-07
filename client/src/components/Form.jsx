import { useState } from 'react';
import './Form.modules.css'
import { useForm } from '../hooks/useForm';
import { login, register } from '../handlers/userHandler';

export function Form({ formName }) {
    const handler = formName === 'login' ? login : formName === 'register' ? register : null;
    const initialValues =
        formName === 'login' ? { email: '', password: '' } : 
        formName === 'register' ? { firstName: '', lastName: '', email: '', mobilePhone: '', password: '', confirmPassword: '' } : {};

    const { values, errors, success, onChange, onSubmit } = useForm(handler, initialValues);

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
                {forms[formName].map((el, index) => (
                    <>
                        <label>{el.label}</label>
                        <input type={el.type} name={el.name} value={values[formName]} onChange={onChange}></input>
                    </>
                ))}
                <button>{formName === "login" ? "Login" : "Register"}</button>
            </form>
        </div>
    );
}
