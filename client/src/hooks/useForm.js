import { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { validate } from '../utils/formValidation';

export function useForm(options = {}) {
    const { handler, form, initialValues, closeModal, openModal, refreshData, selectedDates } = options

    const { login, auth } = useAuth();
    const { showNotification } = useNotification();
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (initialValues) {
          setValues(initialValues);
        }
      }, [initialValues]);

    const onChange = (e) => {
        const { name, type } = e.target;

        if (type === 'file') {
            setValues(state => ({
                ...state,
                [name]: e.target.files[0] || null
            }));
        } else {
            setValues(state => ({
                ...state,
                [name]: e.target.value
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const validation = validate(values, form.fields)

        if (Object.keys(validation).length > 0) {
            setErrors(validation)
            return;
        }

        let response

        try {
            if (form.formName === 'login' || form.formName === 'register') {
                response = await handler(form.accountType, values)
            } else if (form.formName === 'edit-service') {
                response = await handler(values.service_id, values)
                closeModal()
                refreshData()
            } else if (form.formName === 'add-schedule') {
                response = await handler(auth.id, values, selectedDates)
                closeModal()
                refreshData()
            } else {
                response = await handler(auth.id, values)
                refreshData()
            }

            if (response.status === 200) {
                if (form.formName === 'register') {
                    openModal('login');
                } else if (form.formName === 'login') {
                    login(response.results)
                    closeModal()
                }
                
                showNotification(response.message, 'success')
                setValues(initialValues || {});
                setErrors({})
            }

        } catch (error) {
            showNotification(error.message, 'error');
            setErrors({})
        }
    };

    return {
        values,
        setValues,
        onChange,
        onSubmit,
        errors
    };
}
