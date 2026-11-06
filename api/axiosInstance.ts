import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}`;
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});