const buildOptions = (data) => {
    const options = {}

    if (data) {
        options.body = JSON.stringify(data)
        options.headers = {
            'content-type': 'application/json'
        }
    }

    return options
}

const request = async (method, url, data) => {
    try {
        const response = await fetch(url, {
            ...buildOptions(data),
            method
        });

        if (response.status === 204) {
            return {};
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            return result;
        } else {
            const result = await response.text();
            return { message: result };
        }
    } catch (error) {
        console.error("Request failed", error);
        throw new Error('Network or server error occurred');
    }
}

export const get = request.bind(null, 'GET')
export const post = request.bind(null, 'POST')
export const put = request.bind(null, 'PUT')
export const remove = request.bind(null, 'DELETE')