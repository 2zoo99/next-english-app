import { prisma } from "@/lib/prisma";

// 주어진 태그들 중, 더 이상 어떤 문장에도 연결 안 된(고아) 태그를 삭제
export async function cleanupOrphanTags(tagIds: number[]) {
    for (const tagId of tagIds) {
        const count = await prisma.sentenceTag.count({ where: { tagId } });
        if (count === 0) {
            await prisma.tag.delete({ where: { id: tagId } }).catch(() => {
                // 혹시 동시성 문제로 이미 지워졌거나 하면 조용히 무시
            });
        }
    }
}