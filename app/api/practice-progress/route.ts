import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";

// 저장된 진행 상황 조회
export async function GET() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ solvedIds: [] });
    }

    const progress = await prisma.practiceProgress.findUnique({
        where: { userId: currentUser.id }
    });

    return Response.json({ solvedIds: progress?.solvedIds ?? [] });
}

// 진행 상황 저장 (문제 맞출 때마다 호출)
export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const body = await request.json();
    const solvedIds: number[] = body.solvedIds ?? [];

    const progress = await prisma.practiceProgress.upsert({
        where: { userId: currentUser.id },
        update: { solvedIds },
        create: { userId: currentUser.id, solvedIds },
    });

    return Response.json(progress);
}

// 진행 상황 초기화 (한 바퀴 다 돌았거나 "처음부터 하기" 선택 시)
export async function DELETE() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    await prisma.practiceProgress.deleteMany({
        where: { userId: currentUser.id }
    });

    return new Response(null, { status: 204 });
}