import { CreateItemDto, Item, UpdateItemDto } from "@/types/todo";
import { axiosInstance } from "@/api/axiosInstance";

// 할 일 추가
export const postTodo = async (item: CreateItemDto): Promise<Item> => {
    const response = await axiosInstance.post<Item>("/items", item);
    return response.data;
};

// 할 일 목록 조회
export const getTodos = async (): Promise<Item[]> => {
    const response = await axiosInstance.get<Item[]>("/items");
    return response.data;
};

// 할 일 하나 조회
export const getTodo = async (itemId: number): Promise<Item> => {
    const response = await axiosInstance.get<Item>(`/items/${itemId}`);
    return response.data;
};

// 할 일 수정 (바꿀 값만 보내면 된다)
export const patchTodo = async (itemId: number, data: UpdateItemDto): Promise<Item> => {
    const response = await axiosInstance.patch<Item>(`/items/${itemId}`, data);
    return response.data;
};

// 할 일 삭제
export const deleteTodo = async (itemId: number): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string}>(`/items/${itemId}`);
    return response.data;
};

// 이미지 업로드 (업로드된 이미지 주소를 돌려준다)
export const postImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post<{ url: string }>(`/images/upload`, formData);
    return response.data;
}