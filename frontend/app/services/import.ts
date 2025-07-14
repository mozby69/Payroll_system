import api from "./axios";



export const importSQL = async (file:File) => {
    const formData = new FormData();
    formData.append('sqlfile',file);

    const response = await api.post('/import-sql', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
}

