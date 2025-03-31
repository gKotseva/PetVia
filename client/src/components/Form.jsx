import './Form.modules.css';
import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { FcGoogle } from 'react-icons/fc';
import { CiLogin } from "react-icons/ci";
import { login, register } from '../handlers/authHandlers';
import { editService } from '../handlers/salonHandler';


export function Form({ formName, closeModal, openModal, editData }) {
    const [accountType, setAccountType] = useState('customer');

    const toggleAccountType = () => {
        setAccountType(prev => (prev === "customer" ? "salon" : "customer"));
    };

    const handler = {
        login,
        register,
        'edit-service': editService
    }[formName];

    const forms = {
        customer: {
            login: [{ label: 'Email', name: 'email', type: 'text' }, { label: 'Password', name: 'password', type: 'password' }],
            register: [{ label: 'Email', name: 'email', type: 'text' }, { label: 'Password', name: 'password', type: 'password' }, { label: 'Confrim password', name: 'confirm_password', type: 'password' }, { label: 'First name', name: 'first_name', type: 'text' }, { label: 'Last name', name: 'last_name', type: 'text' }, { label: 'Phone number', name: 'phone_number', type: 'text' }],
        },
        salon: {
            login: [{ label: 'Email', name: 'email', type: 'text' }, { label: 'Password', name: 'password', type: 'password' }],
            register: [{ label: 'Email', name: 'email', type: 'text' }, { label: 'Password', name: 'password', type: 'password' }, { label: 'Confirm password', name: 'confirm_password', type: 'password' }, { label: 'Salon name', name: 'salon_name', type: 'text' }, { label: 'Phone number', name: 'phone_number', type: 'text' }, { label: 'State', name: 'state', type: 'text' }, { label: 'City', name: 'city', type: 'text' }, { label: 'Address', name: 'address', type: 'text' }],
        },
        'edit-service': [{ label: 'Name', name: 'name', type: 'text' }, { label: 'Price', name: 'price', type: 'text' }, { label: 'Duration', name: 'duration', type: 'text' }, { label: 'Description', name: 'description', type: 'text' }]
    };

    const { values, onChange, onSubmit } = useForm(handler, formName === 'login' || formName === 'register' ? {accountType, form: formName} : formName, editData, closeModal, openModal);

    return (
        formName === 'login' || formName === 'register' ? (
            <div className="form-container">
                <p className='switch' onClick={toggleAccountType}>Switch to {accountType === "customer" ? "Salon" : "Customer"} <CiLogin /></p>
                <hr></hr>
                <p className='form-heading'>{accountType} {formName}</p>
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
                                        />
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
                                />
                            </div>
                        ))
                    )}
                    <button className="custom-button" type="submit">
                        {formName === "login" ? "Login" : "Register"}
                    </button>
                </form>
                {formName === 'register' ? (
                    <p className='existing'>Already have an account? <a href="#" onClick={() => openModal('login')}>Log In</a></p>
                ) : (
                    <p className='existing'>Don't have an account? <a href="#" onClick={() => openModal('register')}>Register</a></p>
                )}
                <h4 className='line'><span>or</span></h4>
                <FcGoogle className='icon' />
            </div>
        ) : (
            <form onSubmit={onSubmit}>
                {forms[formName].map(({name, label, type}) => (
                    <div key={name} className="input-group">
                        <label htmlFor={name}>{label}</label>
                        <input
                            id={name}
                            type={type}
                            name={name}
                            value={values[name] || ''}
                            onChange={onChange}
                        />
                    </div>
                ))}
                <button className="custom-button" type="submit">Submit</button>
            </form>
        )
    )
}



