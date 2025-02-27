import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

export function useForm(handler, initialValues, formName, closeModal, openModal) {
    const { login } = useUser();
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await handler(values);

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
        errors,
        success,
        successMessage,
        onChange,
        onSubmit,
    };
}
