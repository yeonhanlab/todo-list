import { Item } from "@/types/todo";
import { axiosInstance } from "@/api/axiosInstance";

export const getTodos = async (): Promise<Item[]> => {
    const response = await axiosInstance.get<Item[]>("/items");
    return response.data;
}

