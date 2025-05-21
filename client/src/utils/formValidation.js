export const validate = (values, form) => {
    let error = {};

    console.log(values)
    console.log(form)

    for (const [name, value] of Object.entries(values)) {
        if (name === 'email') {
            if (!value) {
                error[name] = 'Email is required!'
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error[name] = 'Invalid email format.'
            }
        } else if (name === 'password') {
            if (!value) {
                error[name] = 'Password is required!'
            } else if (value.length < 6) {
                error[name] = 'Password must be at least 6 characters.';
            }
        } else {
            if (
                (!value || (typeof value === 'string' && value.trim() === '')) &&
                !['break_start', 'break_end'].includes(name)
            ) {
                error[name] = 'This field is required.';
            }
        }

        if (values.open_time && values.close_time) {
            const [openH, openM] = values.open_time.split(':').map(Number);
            const [closeH, closeM] = values.close_time.split(':').map(Number);

            const openMinutes = openH * 60 + openM;
            const closeMinutes = closeH * 60 + closeM;

            if (openMinutes >= closeMinutes) {
                error.open_time = 'Open time must be earlier than close time.';
                error.close_time = 'Close time must be later than open time.';
            }
        }
    }

    return error;
};