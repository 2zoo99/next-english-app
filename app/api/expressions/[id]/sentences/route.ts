// app/api/expressions/[id]/sentences/route.ts

import { prisma } from '@/lib/prisma'
import { start } from 'repl';

const normalize = (word: string) => {
    return word.replace(/[^a-zA-Z0-9가-힣']/g, '').toLowerCase();
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const expressionId = Number(id);
    const body = await request.json();

    const sentenceId: number | undefined = body.sentenceId; // 기존 문장을 연결
    const content: string | undefined = body.content;       // 새 문장을 만들때
    const translate: string = body.translate || '';
    const startIndex: number | undefined = body.startIndex;
    const endIndex: number | undefined = body.endIndex;

    if (!sentenceId && !content) {
        return Response.json(
            { error: 'sentenceId 혹은 content 중에 하나가 필요합니다.' },
            { status: 400 }
        )
    }

    if (
        typeof startIndex !== 'number' ||
        typeof endIndex !== 'number' ||
        startIndex < 0 ||
        startIndex >= endIndex
    ) {
        return Response.json(
            { error: '표현 위치 (startIndex, endIndex) 가 올바르지 않습니다' },
            { status: 400 }
        )
    }

    try {
        let targetSentenceId = sentenceId;
        let targetContent = content;
        // 새 문장을 입력하는 경우에 sentence 데이터를 생성
        if (!targetSentenceId && content) {
            const words = content
                .split(' ')
                .map((w: string) => normalize(w))
                .filter((w: string) => w.length > 0);

            const sentence = await prisma.sentence.create({
                data: { content, translate }
            });

            for (const [index, w] of words.entries()) {
                const word = await prisma.word.upsert({
                    where: { word: w },
                    update: {},
                    create: { word: w }
                });
                await prisma.sentenceWord.create({
                    data: {
                        sentenceId: sentence.id,
                        wordId: word.id,
                        order: index + 1
                    }
                });
            }
            targetSentenceId = sentence.id;
        } else if (targetSentenceId) {
            // 기존 문장을 쓰는 경우, 실제 문장 길이 안에 범위가 있는지 검증
            const existing = await prisma.sentence.findUnique({
                where: { id: targetSentenceId },
                select: { content: true }
            });
            if (!existing) {
                return Response.json({ error: '존재하지 않는 문장입니다.' }, { status: 404 });
            }
            targetContent = existing.content;
        }
        if (targetContent && endIndex > targetContent.length) {
            return Response.json(
                { error: '표현 위치가 문장 길이를 벗어났습니다.' },
                { status: 400 }
            );
        }

        //expression이랑 sentence 연결시키기
        await prisma.expressionSentence.create({
            data: {
                expressionId,
                sentenceId: targetSentenceId!,
                startIndex,
                endIndex
            }
        });

        const result = await prisma.expression.findUnique({
            where: { id: expressionId },
            include: {
                exampleLinks: { include: { sentence: true } }
            }
        });
        return Response.json(result, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return Response.json(
                { error: '이미 등록되어 있는 문장입니다.' },
                { status: 409 }
            );
        }
        console.error(error);
        return Response.json(
            { error: '예문 등록 중에 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
// 삭제 API
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const expressionId = Number(id);
    const body = await request.json();
    const sentenceId: number = body.sentenceId;

    if (!sentenceId) {
        return Response.json({ error: 'sentenceId가 필요해요.' }, { status: 400 });
    }

    try {
        await prisma.expressionSentence.deleteMany({
            where: { expressionId, sentenceId }
        });

        return Response.json({ message: '예문 연결이 해제되었어요.' });

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: '예문 연결 해제 중 오류가 발생했어요.' },
            { status: 500 }
        );
    }
}