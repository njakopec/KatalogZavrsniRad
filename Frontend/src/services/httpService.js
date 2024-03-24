import axios from "axios";

export const HttpService = axios.create({
    baseURL: 'https://njakopec-001-site1.jtempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});