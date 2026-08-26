// app/api/study-logs/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";

// 오늘 공부 기록 +1 (문제 정답 맞출 때마다 호출)
export async function POST() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    // 오늘 날짜 (시분초 제거)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const log = await prisma.studyLog.upsert({
            where: {
                userId_date: {
                    userId: currentUser.id,
                    date: today,
                }
            },
            update: {
                count: { increment: 1 }
            },
            create: {
                userId: currentUser.id,
                date: today,
                count: 1,
            }
        });

        return Response.json(log, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: '공부 기록 저장 중 오류가 발생했어요.' },
            { status: 500 }
        );
    }
}

// 본인의 전체 공부 기록 조회 (잔디용)
export async function GET() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    oneYearAgo.setHours(0, 0, 0, 0);

    const logs = await prisma.studyLog.findMany({
        where: {
            userId: currentUser.id,
            date: { gte: oneYearAgo }
        },
        orderBy: { date: 'asc' },
        select: { date: true, count: true }
    });

    return Response.json(logs);
}