const axios = require('axios');

const serverBase = 'http://localhost:3000';

export const getHello = () => {
	return axios.get(serverBase + '/');
};

export const getGoodbye = () => {
    return axios.get(serverBase + "/bye");
}

export const postFile = (formData) => {
    return axios.post(serverBase + '/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
    )
    .then(function (response) {
        /* eslint-disable no-console */
        console.log(response);
        /* eslint-enable no-console */
    })
    .catch(function (error) {
        /* eslint-disable no-console */
        console.log(error.response);
        /* eslint-enable no-console */
    });
}

export const logoff = () =>{
    return axios.post(serverBase + '/logoff')
}
export const login = (formData) =>{
    return axios.post(serverBase + '/login',formData)
    .then(function (response) {
        /* eslint-disable no-console */
        console.log(response);
        /* eslint-enable no-console */
    })
    .catch(function (error) {
        /* eslint-disable no-console */
        console.log(error.response);
        /* eslint-enable no-console */
    });
}

export const createAccount = (formData) =>{
    return axios.post(serverBase + '/addAccount',formData)
    .then(function (response) {
        /* eslint-disable no-console */
        console.log(response);
        /* eslint-enable no-console */
    })
    .catch(function (error) {
        /* eslint-disable no-console */
        console.log(error.response);
        /* eslint-enable no-console */
    });
}
export const downloadFiles = (downloadParams) => {
    return axios.get(serverBase+'/download', {params: downloadParams});
}
export const getFiles = (queryParams) => {
    return axios.get(serverBase+'/search', {params:{queryParams}})
}
export const getReportedFiles = (queryParams) => {
    return axios.get(serverBase+'/adminsearch', {params:{queryParams}})
}
export const reportFiles = (reportParams) => {
    return axios.get(serverBase+'/report', {params : reportParams});
}
export const approveFiles = (approveParams) => {
    return axios.get(serverBase+'/approve', {params : approveParams});
}
export const deleteFiles = (deleteParams) => {
    return axios.get(serverBase+'/delete', {params : deleteParams});
}