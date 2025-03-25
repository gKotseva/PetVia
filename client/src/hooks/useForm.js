import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function useForm(handler, initialValues, formName, accountType, closeModal, openModal) {
    const { login, auth } = useAuth();
    const { showNotification } = useNotification();
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [values, setValues] = useState(initialValues);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const getChangedFields = (formName) => {
        const changedFields = {};

        Object.keys(values).forEach(key => {
            if (values[key] !== initialValues[key] && values[key] !== '') {
                changedFields[key] = values[key];
            }
        });

        if (formName === 'editSalon') {
            return {salonId: auth.salonID, changedFields};
        }

        return {userId: auth.id, changedFields};
    };    

    const onSubmit = async (e) => {
        e.preventDefault();  
        try {
            let response
            if(formName === 'editUser' || formName === 'editSalon'){
                const changedFields = getChangedFields(formName);
                response = await handler(changedFields);
            } else {
                response = await handler(accountType, values);
            }

            if (response.status === 200) {
                setSuccess(true);
                setSuccessMessage(response.message);
                setErrors([]);

                if (formName === 'register') {
                    openModal('login')
                } 
                else if (formName === 'login') {
                    login(response.results);
                    closeModal(); 
                }
            }

            showNotification(response.message, 'success')

        } catch (error) {
            setSuccess(false);
            setErrors([error.message]);
            showNotification(error.message, 'error');
        }
    };

    return {
        values,
        setValues,
        errors,
        success,
        successMessage,
        onChange,
        onSubmit,
    };
}
