import { apiConfig, apiKeys } from "./apiConfig";

import axios from "axios";


export const getUrlByKey = (key) => {

    return apiConfig + apiKeys[key];
};

export const getUrlByKeyAndParams = (key, params) => {
    return apiConfig + apiKeys[key]
}

export const apiGet = (key, args) => {

    if (typeof args === "string") {

        return axios.get(getUrlByKey(key), args);
    }
    else if (typeof args === "object") {


        return axios.get(getUrlByKey(key), { ...args }
        );
    }
    else {
        return axios.get(getUrlByKey(key), {
            data: args,
            // withCredentials: true,
        });
    }
};

// export const apiPost = (key, args) => {
//     console.log("key...", key )
//     console.log(args, "35");
//     if (typeof args === "string") {

//         return axios.post(getUrlByKey(key), args);
//     }
//     else if (typeof args === "object") {


//         return axios.post(getUrlByKey(key), { ...args }
//         ); console.log(args, "44");
//     }
//     else {
//         return axios.post(getUrlByKey(key), {
//             data: args,
//             // withCredentials: true,
//         });
//     }
// };



export const apiPost = (key, args) => {
    return axios.post(getUrlByKey(key), args);
};

export const apiPut = (key, args) => {
    return axios.put(getUrlByKey(key), args);
};

export const apiPutUrl = (key, dynamicUrl, args) => {
    return axios.put(getUrlByKey(key) + dynamicUrl, args);
};

export const apiPostUrl = (key, dynamicUrl, args) => {
    return axios.post(getUrlByKey(key) + dynamicUrl, args);
};

export const apiGetUrl = (key, dynamicUrl, args) => {
    return axios.get(getUrlByKey(key) + dynamicUrl, args);
};

export const apiUploadFile = (key, args, config) => {
    return axios.post(getUrlByKey(key), args, config);
};

export const apiDelete = (key, args) => {
    return axios.delete(getUrlByKey(key) + args, args);
};

export const apiDeleteUrl = (key, dynamicUrl, args) => {
    return axios.delete(getUrlByKey(key) + dynamicUrl, args);
};

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('BackToBasic-token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
