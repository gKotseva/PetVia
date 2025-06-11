import './Form.modules.css'

import { useState } from 'react'
import { CiLogin } from "react-icons/ci";

import { login, register } from '../handlers/auth';
import { useForm } from '../hooks/useForm';
import { updateUserDetails } from '../handlers/customer';
import { addImages, addSchedule, addService, addTeamMember, editSalonDetails, editSchedule, editService } from '../handlers/salon';


export function Form(options = {}) {
  const { form, account, openModal, closeModal, initialData, refreshData } = options
  const [accountType, setAccountType] = useState(account || 'customer')

  const formDetails = {
    login: {
      customer: [
        { label: 'email', name: 'email', type: 'text', required: true },
        { label: 'password', name: 'password', type: 'password', required: true },
      ],
      salon: [
        { label: 'email', name: 'email', type: 'text', required: true },
        { label: 'password', name: 'password', type: 'password', required: true },
      ]
    },
    register: {
      customer: [
        { label: 'email', name: 'email', type: 'text', required: true },
        { label: 'password', name: 'password', type: 'password', required: true },
        { label: 'confirm password', name: 'confirm-password', type: 'password', required: true },
        { label: 'first name', name: 'first_name', type: 'text', required: true },
        { label: 'last name', name: 'last_name', type: 'text', required: true },
        { label: 'phone number', name: 'phone_number', type: 'text', required: true },
      ],
      salon: [
        { label: 'email', name: 'email', type: 'text', required: true },
        { label: 'password', name: 'password', type: 'password', required: true },
        { label: 'confirm password', name: 'confirm-password', type: 'password', required: true },
        { label: 'salon name', name: 'name', type: 'text', required: true },
        { label: 'phone number', name: 'phone_number', type: 'text', required: true },
        { label: 'state', name: 'state', type: 'text', required: true },
        { label: 'city', name: 'city', type: 'text', required: true },
        { label: 'address', name: 'address', type: 'text', required: true },
      ]
    },
    'edit-user': [
      { label: 'first name', name: 'first_name', type: 'text', required: true },
      { label: 'last name', name: 'last_name', type: 'text', required: true },
      { label: 'email', name: 'email', type: 'text', required: true },
      { label: 'phone number', name: 'phone_number', type: 'text', required: true },
      { label: 'password', name: 'password', type: 'text', required: false },
    ],
    'edit-salon': [
      { label: 'email', name: 'email', type: 'text', required: true },
      { label: 'password', name: 'password', type: 'text', required: false },
      { label: 'name', name: 'name', type: 'text', required: true },
      { label: 'phone number', name: 'phone_number', type: 'text', required: true },
      { label: 'state', name: 'state', type: 'text', required: true },
      { label: 'city', name: 'city', type: 'text', required: true },
      { label: 'address', name: 'address', type: 'text', required: true },
      { label: 'description', name: 'description', type: 'textarea', required: false },
    ],
    'add-team-member': [
      { label: 'name', name: 'name', type: 'text', required: true },
      { label: 'image', name: 'image', type: 'file', required: false },
    ],
    'add-service': [
      { label: 'name', name: 'name', type: 'text', required: true },
      { label: 'price', name: 'price', type: 'number', required: true },
      { label: 'duration', name: 'duration', type: 'number', required: true },
      { label: 'description', name: 'description', type: 'textarea', required: false },
    ],
    'edit-service': [
      { label: 'name', name: 'name', type: 'text', required: true },
      { label: 'price', name: 'price', type: 'number', required: true },
      { label: 'duration', name: 'duration', type: 'number', required: true },
      { label: 'description', name: 'description', type: 'textarea', required: false },
    ],
    'add-schedule': [
      { label: 'open time', name: 'open_time', type: 'time', required: true },
      { label: 'close time', name: 'close_time', type: 'time', required: true },
      { label: 'break start', name: 'break_start', type: 'time', required: false },
      { label: 'break end', name: 'break_end', type: 'time', required: false },
    ],
    'edit-schedule': [
      { label: 'open time', name: 'open_time', type: 'time', required: true },
      { label: 'close time', name: 'close_time', type: 'time', required: true },
      { label: 'break start', name: 'break_start', type: 'time', required: false },
      { label: 'break end', name: 'break_end', type: 'time', required: false },
    ],
    'add-review': [
      { label: 'rating', name: 'rating', type: 'number', required: true },
      { label: 'text', name: 'text', type: 'textarea', required: true },
    ],
    'add-photos': { label: 'image', name: 'image', type: 'file', required: true }
  }

  const toggleAccountType = () => {
    setAccountType(prev => (prev === "customer" ? "salon" : "customer"));
  };

  const fields = formDetails[form]?.[accountType] || formDetails[form];

  const colsPerForm = {
    register: 3,
    'edit-salon': 2,
    'add-service': 3,
    'edit-service': 3,
  };

  const cols = colsPerForm[form] || 1;

  const handler = {
    login,
    register,
    'edit-user': updateUserDetails,
    'edit-salon': editSalonDetails,
    'add-team-member': addTeamMember,
    'add-service': addService,
    'edit-service': editService,
    'add-schedule': addSchedule,
    'edit-schedule': editSchedule,
    'add-photos': addImages,
    // 'add-review',
  }[form]

  const { values, onChange, onSubmit, errors } = useForm({
    handler: handler,
    form: (form === 'login' || form === 'register' ? { accountType, formName: form, fields } : { formName: form, fields }),
    initialValues: form !== 'add-schedule' ? initialData : null,
    closeModal,
    openModal,
    refreshData,
    selectedDates: initialData
  });

  return (
    <div className="form-container">
      <div className='form-heading'>
        {(form === 'login' || form === 'register')
          ? <div>
            <p className='switch' onClick={toggleAccountType}>Switch to {accountType === "customer" ? "Salon" : "Customer"} <CiLogin /></p>
            <hr></hr>
            <br />
            <h5>{form} as {accountType}</h5>
            <br />
          </div>
          : <h5>{(form === 'login' && form === 'register') ? form.replace(/-/g, ' ') : null}</h5>}
      </div>
      <form className={'form ' + form} style={{ '--cols': cols }} onSubmit={onSubmit}>
        {(Array.isArray(fields) ? fields : [fields]).map(form => (
          <div key={form.name} className="form-group">
            <label htmlFor={form.name}>
              {form.required && <span className="required-field">*</span>} {form.label}
            </label>
            {form.type === 'textarea' ? (
              <>
                <textarea
                  name={form.name}
                  id={form.name}
                  rows="5"
                  onChange={onChange}
                  value={values[form.name] ?? ''}
                />
                {errors[form.name] && <p className="input-error">{errors[form.name]}</p>}
              </>
            ) : (
              <>
                <input
                  type={form.type}
                  name={form.name}
                  id={form.name}
                  onChange={onChange}
                  multiple={options.form === 'add-photos'}
                  {...(form.type === 'file' ? {} : { value: values[form.name] ?? '' })}
                />
                {errors[form.name] && <p className="input-error">{errors[form.name]}</p>}
              </>
            )}
          </div>
        ))}
        <button className='custom-button'>submit</button>
      </form>
      <br />
      {form === 'login'
        ? <p className='existing'>Don't have an account? <a href="#" onClick={() => openModal('register')}>Register</a></p>
        : form === 'register' ? <p className='existing'>Already have an account? <a href="#" onClick={() => openModal('login')}>Log In</a></p>
          : null
      }
    </div>
  )
}