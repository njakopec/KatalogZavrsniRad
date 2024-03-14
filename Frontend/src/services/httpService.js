import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://vekima-001-site1.htempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});