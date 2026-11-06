import { Item } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

export async function getTodos(): Promise<Item[]> {
    const response = await fetch(`${API_URL}/${TENANT_ID}/items`);
    const data = await response.json();
    return data;
}
