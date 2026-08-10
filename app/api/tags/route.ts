// 전체 태그 목록 조회 API
// /app/api/tags/route.ts

//태그 목록 전체 보기

import { prisma } from "@/lib/prisma";

export async function GET() {
    const tags = await prisma.tag.findMany({
        orderBy: {
            name: "asc"
        },
        include: {
            _count: {
                select: { sentenceTags: true }
            }
        }
    });
    return Response.json(tags);
}