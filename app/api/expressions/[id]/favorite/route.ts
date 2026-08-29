// app/api/expressions/[id]/favorite/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";

export async function POST(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const { id } = await params;
    const expressionId = Number(id);

    try {
        await prisma.expressionFavorite.create({
            data: { userId: currentUser.id, expressionId }
        });
        return Response.json({ favorited: true }, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return Response.json({ favorited: true }); // 이미 즐겨찾기 되어있음
        }
        console.error(error);
        return Response.json({ error: '즐겨찾기 추가 중 오류가 발생했어요.' }, { status: 500 });
    }
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const { id } = await params;
    const expressionId = Number(id);

    await prisma.expressionFavorite.deleteMany({
        where: { userId: currentUser.id, expressionId }
    });

    return Response.json({ favorited: false });
}