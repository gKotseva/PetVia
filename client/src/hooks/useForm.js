import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function useForm(handler, form, initialValues, closeModal, openModal, refreshData, selectedDates) {
    const { login, auth } = useAuth();
    const { showNotification } = useNotification();
    const [values, setValues] = useState(() => initialValues || {});

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

        if (form === 'edit-service' && initialValues?.service_id) {
            return {id: initialValues.service_id, changedFields}
        }    

        return {id: auth.id, changedFields};
    };    
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let response

            if (form.form === 'login' || form.form === 'register'){
                response = await handler(form.accountType, values)
            } else if (form === 'edit-salon' || form === 'edit-service' || form === 'edit-user') {
                const changedFields = getChangedFields()
                response = await handler(changedFields)
            } else if (form === 'add-schedule') {
                response = await handler(auth.id, values, selectedDates)
            } else {
                response = await handler(auth.id, values)
                refreshData()
            }

            if (response.status === 200){
                showNotification(response.message, 'success')

                if (form.form === 'register') {
                    openModal('login');
                } else if (form.form === 'login') {
                    login(response.results)
                    closeModal()
                } else if (form === 'edit-service') {
                    closeModal()
                }

            } else {
                throw new Error(response.message)
              }

        } catch (error) {
            showNotification(error.message, 'error');
        }
    };

    return {
        values,
        setValues,
        onChange,
        onSubmit,
    };
}
