// app/api/free-writing/[id]/route.ts

// 남의 것도 못 지우게 소유권 체크만 넣었고, ADMIN 예외는 안 넣었어요 — 개인 작문 기록은 관리자도 남의 것을 함부로 지울 이유가 없는 것 같아서요. 필요하시면 말씀해주세요.

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const { id } = await params;
    const writingId = Number(id);

    const writing = await prisma.freeWriting.findUnique({
        where: { id: writingId }
    });
    if (!writing) {
        return Response.json({ error: '존재하지 않는 기록이에요.' }, { status: 404 });
    }
    if (writing.userId !== currentUser.id) {
        return Response.json({ error: '삭제할 권한이 없어요.' }, { status: 403 });
    }

    await prisma.freeWriting.delete({ where: { id: writingId } });
    return new Response(null, { status: 204 });
}