import './Form.modules.css';
import React, { useState } from 'react';
import { login, register } from '../handlers/authHandlers';
import { updateService } from '../handlers/salonHandlers';
import { useForm } from '../hooks/useForm';
import { FcGoogle } from 'react-icons/fc';
import { CiLogin } from "react-icons/ci";


export function Form({ formName, closeModal, openModal, editData = {} }) {
    const [accountType, setAccountType] = useState('customer');

    const toggleAccountType = () => {
        setAccountType(prev => (prev === "customer" ? "salon" : "customer"));
    }; 

    const submitHandler = {
        login,
        register,
        'edit-service': updateService
    }[formName];

    const initialValues = formName === 'edit-service'
    ? { 
        service_id: editData.service_id || '',
        name: editData.name || '',
        price: editData.price || '',
        duration: editData.duration || '',
        description: editData.description || ''
      }
    : {
        customer: {
          login: { email: '', password: '' },
          register: { firstName: '', lastName: '', email: '', mobilePhone: '', password: '', confirmPassword: '' }
        },
        salon: {
          login: { email: '', password: '' },
          register: { email: '', password: '', confirmPassword: '' }
        }
      }[accountType]?.[formName] || {};  

    const { values, errors, onChange, onSubmit } = useForm(submitHandler, initialValues, formName, accountType,closeModal, openModal, onSuccess);

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
                { type: "email", label: "Email", name: 'email' },
                { type: "password", label: "Password", name: 'password' },
                { type: "password", label: "Repeat Password", name: 'confirmPassword' }
            ]
        },
        'edit-service': [
            {type: 'text', name: 'name', label: 'Name'},
            {type: 'text', name: 'price', label: 'Price'},
            {type: 'text', name: 'duration', label: 'Duration'},
            {type: 'text', name: 'description', label: 'Description'},
        ]
    };

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
            <div className="form-container">
            <p className='form-heading'>Edit Service</p>
            <form onSubmit={onSubmit}>
                    <div className="form-row">
                        {forms[formName].map(({ type, label, name }, index) => (
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
                                </div>
                            </div>
                        ))}
                    </div>
                <button className="custom-button" type="submit">Submit</button>
            </form>
        </div>
        )
    );
}
