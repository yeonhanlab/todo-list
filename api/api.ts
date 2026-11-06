import { CreateItemDto, Item, UpdateItemDto } from "@/types/todo";
import { axiosInstance } from "@/api/axiosInstance";

export const postTodo = async (item: CreateItemDto): Promise<Item> => {
    const response = await axiosInstance.post<Item>("/items", item);
    return response.data;
};

export const getTodos = async (): Promise<Item[]> => {
    const response = await axiosInstance.get<Item[]>("/items");
    return response.data;
};

export const getTodo = async (itemId: number): Promise<Item> => {
    const response = await axiosInstance.get<Item>(`/items/${itemId}`);
    return response.data;
};

export const patchTodo = async (itemId: number, data: UpdateItemDto): Promise<Item> => {
    const response = await axiosInstance.patch<Item>(`/items/${itemId}`, data);
    return response.data;
};

export const deleteTodo = async (itemId: number): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string}>(`/items/${itemId}`);
    return response.data;
};

export const postImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post<{ url: string }>(`/images/upload`, formData);
    return response.data;
}