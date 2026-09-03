// app/api/practice/next/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import { visibilityWhere } from "@/utils/auth/visibilityWhere";

export async function GET(request: Request) {
    const currentUser = await getCurrentUser();
    const { searchParams } = new URL(request.url);

    const tagIdsParam = searchParams.get('tagIds'); // "1,2,3"
    const excludeIdsParam = searchParams.get('excludeIds'); // "10,11,12"

    const tagIds = tagIdsParam ? tagIdsParam.split(',').map(Number).filter(n => !isNaN(n)) : [];
    const excludeIds = excludeIdsParam ? excludeIdsParam.split(',').map(Number).filter(n => !isNaN(n)) : [];

    const visibility = visibilityWhere(
        currentUser ? { id: currentUser.id, role: currentUser.role } : null
    );

    const where = {
        AND: [
            visibility,
            ...(tagIds.length > 0
                ? [{ sentenceTags: { some: { tagId: { in: tagIds } } } }]
                : []),
        ]
    };

    // 전체 개수 (필터만 적용, exclude 반영 안 함)
    const totalCount = await prisma.sentence.count({ where });

    // 아직 안 푼 것들 중에서 하나 랜덤으로
    const remainingWhere = {
        AND: [
            ...where.AND,
            ...(excludeIds.length > 0
                ? [{ id: { notIn: excludeIds } }]
                : []),
        ]
    };
    const remainingCount = await prisma.sentence.count({ where: remainingWhere });

    if (remainingCount === 0) {
        return Response.json({ sentence: null, totalCount, remainingCount: 0 });
    }

    const randomOffset = Math.floor(Math.random() * remainingCount);

    const [sentence] = await prisma.sentence.findMany({
        where: remainingWhere,
        include: {
            sentenceWords: { orderBy: { order: 'asc' }, include: { word: true } },
            sentenceTags: { include: { tag: true } },
            expressionSentences: {          // 추가
                include: { expression: true }
            },
        },
        skip: randomOffset,
        take: 1,
    });

    return Response.json({ sentence, totalCount, remainingCount });
}