import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useForm(handler, initialValues, formName, accountType,closeModal, openModal) {
    const { login, user } = useAuth();
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
    
        return {userId: user.id, changedFields};
    };

    const onSubmit = async (e) => {
        e.preventDefault();  
        try {
            let response
            if(formName === 'editUser'){
                const changedFields = getChangedFields();
                response = await handler(changedFields);
            } else {
                response = await handler(accountType, values);
            }

            if (response.success) {
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
        } catch (error) {
            setSuccess(false);
            setErrors([error.message]);
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
