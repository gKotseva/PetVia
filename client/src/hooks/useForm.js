import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function useForm(handler, initialValues, formName, accountType, closeModal, openModal, onSuccess) {
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

    const getChangedFields = () => {
        const changedFields = {};

        Object.keys(values).forEach(key => {
            if (values[key] !== initialValues[key] && values[key] !== '') {
                changedFields[key] = values[key];
            }
        });

        if (formName === 'edit-service' && initialValues?.service_id) {
            return {id: initialValues.service_id, changedFields}
        }    

        return {id: auth.id, changedFields};
    };    

    const onSubmit = async (e) => {
        e.preventDefault();  
        try {
            let response
            if(formName === 'editUser' || formName === 'editSalon' || formName === 'edit-service'){
                const changedFields = getChangedFields();
                response = await handler(changedFields);
            } else if (formName === 'login' || formName === 'register') {
                response = await handler(accountType, values);
            } else {
                response = await handler(values, auth.id);
                console.log(response)
            }
            console.log(response)
            if (response.status === 200) {
            if (onSuccess) onSuccess(response.results);
                setSuccess(true);
                setSuccessMessage(response.message);
                setErrors([]);

                if (formName === 'register') {
                    openModal('login')
                } 
                else if (formName === 'login') {
                    login(response.results);
                    closeModal(); 
                } else if (formName === 'edit-service'){
                    closeModal()
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
