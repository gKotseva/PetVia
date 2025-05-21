import './Form.modules.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { CiLogin } from "react-icons/ci";
import { login, register } from '../handlers/authHandlers';
import { editSchedule, editService } from '../handlers/salonHandlers';


export function Form({ formName, closeModal, openModal, editData, refreshData }) {
    const [accountType, setAccountType] = useState('customer');
    const toggleAccountType = () => {
        setAccountType(prev => (prev === "customer" ? "salon" : "customer"));
    };

    const handler = {
        login,
        register,
        'edit-service': editService,
        'edit-schedule': editSchedule
    }[formName];

    const forms = {
        customer: {
            login: [
                { label: 'Email', name: 'email', type: 'text', required: true },
                { label: 'Password', name: 'password', type: 'password', required: true }
            ],
            register: [
                { label: 'Email', name: 'email', type: 'text', required: true },
                { label: 'Password', name: 'password', type: 'password', required: true },
                { label: 'Confirm password', name: 'confirm_password', type: 'password', required: true },
                { label: 'First name', name: 'first_name', type: 'text', required: true },
                { label: 'Last name', name: 'last_name', type: 'text', required: true },
                { label: 'Phone number', name: 'phone_number', type: 'text', required: true }
            ]
        },
        salon: {
            login: [
                { label: 'Email', name: 'email', type: 'text', required: true },
                { label: 'Password', name: 'password', type: 'password', required: true }
            ],
            register: [
                { label: 'Email', name: 'email', type: 'text', required: true },
                { label: 'Password', name: 'password', type: 'password', required: true },
                { label: 'Confirm password', name: 'confirm_password', type: 'password', required: true },
                { label: 'Salon name', name: 'salon_name', type: 'text', required: true },
                { label: 'Phone number', name: 'phone_number', type: 'text', required: true },
                { label: 'State', name: 'state', type: 'text', required: true },
                { label: 'City', name: 'city', type: 'text', required: true },
                { label: 'Address', name: 'address', type: 'text', required: true }
            ]
        },
        'edit-service': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Price', name: 'price', type: 'text', required: true },
            { label: 'Duration', name: 'duration', type: 'text', required: true },
            { label: 'Description', name: 'description', type: 'text', required: false }
        ],
        'edit-schedule': [
            { label: 'Open Time', name: 'open_time', type: 'time', required: true },
            { label: 'Close Time', name: 'close_time', type: 'time', required: true },
            { label: 'Break start', name: 'break_start', type: 'time', required: false },
            { label: 'Break end', name: 'break_end', type: 'time', required: false }
        ]
    };

    const currentFormFields = useMemo(() => {
        return (formName === 'login' || formName === 'register')
            ? forms[accountType]?.[formName] || []
            : forms[formName] || [];
    }, [formName, accountType]);

    const initialValues = useMemo(() => {
        const values = {};
        currentFormFields.forEach(({ name }) => {
            values[name] = editData?.[name] || '';
        });

        if (editData?.service_id) {
            values.service_id = editData.service_id;
        } else if (editData?.id) {
            values.id = editData.id;
        }

        return values;
    }, [currentFormFields, editData]);

    const { values, onChange, onSubmit, errors } = useForm({
        handler: handler,
        form: (handler, formName === 'login' || formName === 'register' ? { accountType, form: formName } : formName),
        initialValues,
        closeModal,
        openModal,
        refreshData,
        selectedDates: editData
    });

    return (
        formName === 'login' || formName === 'register' ? (
            <div className="form-container">
                <p className='switch' onClick={toggleAccountType}>Switch to {accountType === "customer" ? "Salon" : "Customer"} <CiLogin /></p>
                <hr></hr>
                <p className='form-heading'>{accountType} {formName}</p>
                <form onSubmit={onSubmit} data-testid={formName}>
                    {formName === 'register' ? (
                        <div className="form-form-row">
                            {forms[accountType][formName].map(({ type, label, name }, index) => (
                                <div key={name} className="form-column">
                                    <div className="input-group">
                                        <label htmlFor={name}><span className='required-field'>*</span> {label}</label>
                                        <input
                                            id={name}
                                            type={type}
                                            name={name}
                                            value={values[name] || ''}
                                            onChange={onChange}
                                        />
                                        {errors[name] && <p className="input-error">{errors[name]}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        forms[accountType][formName].map(({ type, label, name, required }) => (
                            <div key={name} className="input-group">
                                <label htmlFor={name}>
                                    {required && <span className="required-field">*</span>} {label}
                                </label>                                <input
                                    id={name}
                                    type={type}
                                    name={name}
                                    value={values[name] || ''}
                                    onChange={onChange}
                                />
                                {errors[name] && <p className="input-error">{errors[name]}</p>}
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
            </div>
        ) : (
            <form onSubmit={onSubmit} className={`form-${formName}`}>
                {formName === 'edit-schedule' ? (<h2>Editing schedule for {editData}</h2>) : <h2>Editing service "{editData.name}"</h2>}
                <br></br>
                {forms[formName].map(({ name, label, type, required }) => (
                    <div key={name} className="input-group">
                        <label htmlFor={name}>
                            {required && <span className="required-field">*</span>} {label}
                        </label>                       
                        <input
                            id={name}
                            type={type}
                            name={name}
                            value={values[name] || editData[name] || ''}
                            onChange={onChange}
                        />
                        {errors[name] && <p className="input-error">{errors[name]}</p>}
                    </div>
                ))}
                <button className="custom-button" type="submit">Submit</button>
            </form>
        )
    )
}

