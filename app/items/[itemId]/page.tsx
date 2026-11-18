import { connection } from "next/server";
import { getTodo } from "@/api/api";
import ItemDetail from "@/components/item-detail";

export default async function ItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
    await connection();
    const { itemId } = await params;
    const todo = await getTodo(Number(itemId));

    return <ItemDetail todo={todo} />;
}
