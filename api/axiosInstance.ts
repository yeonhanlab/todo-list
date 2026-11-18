import axios from 'axios';

// 모든 요청이 공통으로 쓰는 주소 (API 주소 + 본인의 tenantId)
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}`;
// 요청 함수에서는 "/items"처럼 뒷부분만 쓰면 된다 (10초 안에 응답이 없으면 실패 처리)
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});