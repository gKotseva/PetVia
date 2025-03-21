import * as request from '../lib/request'

export const getAllUserData = async(id) => {
    try {
        const response = await request.get(`/api/users/getAllUserData?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const editUserData = async(data) => {
    const {userId, changedFields} = data

    try {
        const response = await request.put(`/api/users/updateUserData`, {userId, changedFields});
        return response;
    } catch (error) {
        throw error;
    }
}

