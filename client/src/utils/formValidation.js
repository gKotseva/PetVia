export const validate = (values, fields) => {
    let error = {};

    if (!Array.isArray(fields)) {
        fields = [fields];
    }

    for (const field of fields) {
        const { name, required } = field;
        const value = values[name];

        if (required) {
            if (
                value === null ||
                value === undefined ||
                (typeof value === 'string' && value.trim() === '') ||
                (typeof value === 'number' && isNaN(value))
            ) {
                error[name] = 'This field is required.';
                continue;
            }
        }

        if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
            error[name] = 'Invalid email format.';
        }

        if (name === 'password' && value && value.length < 6) {
            error[name] = 'Password must be at least 6 characters.';
        }
    }

    if ('password' in values && 'confirm-password' in values) {
        if (values['confirm-password'] !== values['password']) {
            error['confirm-password'] = 'Passwords do not match.';
        }
    }

    //     if (values.open_time && values.close_time) {
    //         const [openH, openM] = values.open_time.split(':').map(Number);
    //         const [closeH, closeM] = values.close_time.split(':').map(Number);

    //         const openMinutes = openH * 60 + openM;
    //         const closeMinutes = closeH * 60 + closeM;

    //         if (openMinutes >= closeMinutes) {
    //             error.open_time = 'Open time must be earlier than close time.';
    //             error.close_time = 'Close time must be later than open time.';
    //         }
    //     }
    // }

    return error;
};