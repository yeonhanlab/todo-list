import { connection } from "next/server";
import { getTodo } from "@/api/api";
import ItemDetail from "@/components/item-detail";

// 할 일 상세 페이지 (/items/{itemId}) : 서버에서 해당 할 일을 가져와 ItemDetail에 넘긴다
export default async function ItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
    // 요청 시점에 렌더링하도록 설정
    await connection();
    // 주소의 번호는 항상 문자열로 오고, getTodo는 숫자를 받으므로 Number()로 바꾼다
    const { itemId } = await params;
    const todo = await getTodo(Number(itemId));

    return <ItemDetail todo={todo} />;
}
