// app/api/free-writing/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";

// 본인이 작성한 기록만 조회
export async function GET() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const writings = await prisma.freeWriting.findMany({
        where: { userId: currentUser.id },
        orderBy: { createdAt: 'desc' }
    });

    return Response.json(writings);
}

// 새 기록 생성
export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const body = await request.json();
    const korean: string = body.korean?.trim();
    const english: string = body.english?.trim();

    if (!korean || !english) {
        return Response.json(
            { error: '한국어와 영어 내용을 모두 작성해주세요.' },
            { status: 400 }
        );
    }

    try {
        const writing = await prisma.freeWriting.create({
            data: { korean, english, userId: currentUser.id }
        });
        return Response.json(writing, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: '저장 중 오류가 발생했어요.' },
            { status: 500 }
        );
    }
}