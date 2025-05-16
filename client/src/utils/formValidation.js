export const validate = (values) => {
    let error = {};

    for (const [name, value] of Object.entries(values)) {
        if (name === 'email') {
            if (!value) {
                error[name] = 'Email is required!'
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error[name] = 'Invalid email format.'
            }
        } else if (name === 'password') {
            if (!value) {
                error[name] = 'Email is required!'
            } else if (value.length < 6) {
                error[name] = 'Password must be at least 6 characters.';
            }
        } else {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                error[name] = 'This field is required.'
            }
        }
    }

    return error;
};