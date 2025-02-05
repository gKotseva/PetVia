import { useState } from "react";

export function useForm (handler, initialValues) {
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const [values, setValues] = useState([])

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(values)
        console.log(handler)
    };

    return {
        values,
        errors,
        success,
        onChange,
        onSubmit,
        setValues,
    };

}