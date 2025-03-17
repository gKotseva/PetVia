import './Form.modules.css';
import React, { useState } from 'react';
import { login, register } from '../handlers/userHandlers';
import { useForm } from '../hooks/useForm';
import { FcGoogle } from 'react-icons/fc';
import { CiAlignCenterH, CiLogin } from "react-icons/ci";


export function Form({ formName, closeModal, openModal }) {
    const [accountType, setAccountType] = useState('customer');

    const toggleAccountType = () => {
        setAccountType(prev => (prev === "customer" ? "salon" : "customer"));
    };

    const submitHandler = formName === 'login' ? login : register;

    const initialValues = {
        customer: {
            login: { email: '', password: '' },
            register: { firstName: '', lastName: '', email: '', mobilePhone: '', password: '', confirmPassword: '' }
        },
        salon: {
            login: { email: '', password: '' },
            register: { name: '', address: '', email: '', city: '', password: '', confirmPassword: '' }
        }
    }[accountType][formName];

    const { values, errors, success, successMessage, onChange, onSubmit } = useForm(
        submitHandler, initialValues, formName, closeModal, openModal
    );

    const forms = {
        customer: {
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
        },
        salon: {
            login: [
                { type: "email", label: "Email", name: 'email' },
                { type: "password", label: "Password", name: 'password' }
            ],
            register: [
                { type: "text", label: "Name", name: 'name' },
                { type: "text", label: "Address", name: 'address' },
                { type: "email", label: "Email", name: 'email' },
                { type: "text", label: "City", name: 'city' },
                { type: "password", label: "Password", name: 'password' },
                { type: "password", label: "Repeat Password", name: 'confirmPassword' }
            ]
        }
    };

    return (
        <div className="form-container">
            <p className='switch' onClick={toggleAccountType}>Switch to {accountType === "customer" ? "Salon" : "Customer"} <CiLogin/></p>
            <hr></hr>
            <form onSubmit={onSubmit}>
                {formName === 'register' ? (
                    <div className="form-row">
                        {forms[accountType][formName].map(({ type, label, name }, index) => (
                            <div key={name} className="form-column">
                                <div className="input-group">
                                    <label htmlFor={name}>{label}</label>
                                    <input
                                        id={name}
                                        type={type}
                                        name={name}
                                        value={values[name] || ''}
                                        onChange={onChange}
                                        className={errors[name] ? "error-input" : ""}
                                    />
                                    {errors[name] && <p className="error-text">{errors[name]}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    forms[accountType][formName].map(({ type, label, name }) => (
                        <div key={name} className="input-group">
                            <label htmlFor={name}>{label}</label>
                            <input
                                id={name}
                                type={type}
                                name={name}
                                value={values[name] || ''}
                                onChange={onChange}
                                className={errors[name] ? "error-input" : ""}
                            />
                            {errors[name] && <p className="error-text">{errors[name]}</p>}
                        </div>
                    ))
                )}
            </form>
            <button className='custom-button' type="submit">
                {formName === "login" ? "Login" : "Register"}
            </button>
            {formName === 'register' ? (
                <p className='existing'>Already have an account? <a href="#" onClick={() => openModal('login')}>Log In</a></p>
            ) : (
                <p className='existing'>Don't have an account? <a href="#" onClick={() => openModal('register')}>Register</a></p>
            )}
            <h4 className='line'><span>or</span></h4>
            <FcGoogle className='icon' />
        </div>
    );
}
