import { useState } from "react";

export function useForm (handler, initialValues) {
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const [values, setValues] = useState(initialValues)

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
                setSuccessMessage(response.message);
                setErrors([])
            }
        } catch (error) {
            setErrors([error.message]);
        }
    };

    return {
        values,
        errors,
        success,
        onChange,
        onSubmit,
    };

}