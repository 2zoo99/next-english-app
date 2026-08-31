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
    const sentenceId = Number(id);

    try {
        await prisma.sentencePractice.upsert({
            where: { userId_sentenceId: { userId: currentUser.id, sentenceId } },
            update: {
                correctCount: { increment: 1 },
                lastPracticedAt: new Date(),
            },
            create: {
                userId: currentUser.id,
                sentenceId,
                correctCount: 1,
            },
        });
        return Response.json({ success: true });
    } catch (error) {
        console.error(error);
        return Response.json({ error: '기록 저장 중 오류가 발생했어요.' }, { status: 500 });
    }
}