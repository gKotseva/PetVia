import { useState } from 'react';
import { useUser } from '../context/userContext';

export function useForm(handler, initialValues, formName, closeModal, openModal) {
    const { login, user } = useUser();
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

        const changedFields = getChangedFields();
        
        try {
            let response

            if(formName === 'editUser'){
                response = await handler(changedFields);
            } else {
                response = await handler(values);
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
