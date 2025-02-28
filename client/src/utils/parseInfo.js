export const parseInfo = (data) => {
    const parsedData = { ...data[0] };

    for (const key in parsedData) {
        if (typeof parsedData[key] === 'string' && parsedData[key].startsWith('[')) {
            try {
                parsedData[key] = JSON.parse(parsedData[key]);
            } catch (err) {
                console.error(`Error parsing field ${key}:`, err);
            }
        }
    }

    return parsedData;
};
