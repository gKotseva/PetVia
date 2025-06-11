const BASE_URL = import.meta.env.VITE_API_URL || '';

const buildOptions = (data) => {
    const options = {};
  
    if (data) {
    const hasFileArray = Object.values(data).some(value =>
      Array.isArray(value) && value.every(item => item instanceof File)
    );

    if (hasFileArray) {
      const formData = new FormData();

      for (const key in data) {
        if (Array.isArray(data[key]) && data[key].every(item => item instanceof File)) {
          data[key].forEach(file => formData.append(key, file));
        } else {
          formData.append(key, data[key]);
        }
      }

      options.body = formData;

      } else {
        options.body = JSON.stringify(data);
        options.headers = {
          'content-type': 'application/json',
        };
      }
    }
  
    return options;
  };

const request = async (method, url, data) => {
    try {
        const response = await fetch(BASE_URL + url, {
            ...buildOptions(data),
            method
        });

        const status = response.status;

        if (status === 204) {
            return { status };
        }

        const contentType = response.headers.get("Content-Type");
        let result;

        if (contentType && contentType.includes("application/json")) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        if (!response.ok) {
            const error = new Error(result.message || 'Error occurred');
            error.status = status;
            error.response = result;
            throw error;
        }

        return { status, ...result };

    } catch (error) {
        throw error;
    }
};


export const get = request.bind(null, 'GET')
export const post = request.bind(null, 'POST')
export const put = request.bind(null, 'PUT')
export const remove = request.bind(null, 'DELETE')