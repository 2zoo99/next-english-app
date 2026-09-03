// app/api/sentences/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import { visibilityWhere } from "@/utils/auth/visibilityWhere";

// 전체 조회
export async function GET() {
    const currentUser = await getCurrentUser();

    const sentences = await prisma.sentence.findMany({
        where: visibilityWhere(currentUser ? { id: currentUser.id, role: currentUser.role } : null),
        orderBy: { createdAt: 'desc' },
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            },
            sentenceTags: {
                include: { tag: true }
            },
            expressionSentences: {
                include: { expression: true }
            },
            practicedBy: currentUser
                ? { where: { userId: currentUser.id } }
                : false
        }
    })

    const result = sentences.map(s => ({
        ...s,
        isPracticed: s.practicedBy ? s.practicedBy.length > 0 : false,
        practiceCount: s.practicedBy?.[0]?.correctCount ?? 0,
        practicedBy: undefined,   // 원본 관계 필드는 응답에서 제거
    }));

    return Response.json(result);
}
// 생성
export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return Response.json(
            { error: '로그인이 필요해요.' },
            { status: 401 }
        );
    }

    const body = await request.json();
    const content: string = body.content;
    const translate: string = body.translate || '';
    const hint: string = body.hint?.trim() || '';   // 추가

    const tagNames: string[] = body.tags || [];

    const normalize = (word: string) => {
        return word
            .replace(/[^a-zA-Z0-9가-힣]/g, '')
            .toLowerCase();
    }
    const words = content
        .split(' ')                          // 공백으로 단어 분리
        .map((word: string) => normalize(word))  // 전처리
        .filter((word: string) => word.length > 0) // 빈 문자열 제거

    try {
        // 문장 생성 (userId 기록)
        const sentence = await prisma.sentence.create({
            data: {
                content,
                translate,
                hint: hint || null,
                userId: currentUser.id,   // 추가
            }
        });
        // 단어 upsert하고 sentenceWords 테이블에 연결
        for (const [index, w] of words.entries()) {
            const word = await prisma.word.upsert({
                where: { word: w },
                update: {},
                create: { word: w }
            })

            await prisma.sentenceWord.create({
                data: {
                    sentenceId: sentence.id,
                    wordId: word.id,
                    order: index + 1
                }
            })
        }

        const cleanTagNames = [...new Set(
            tagNames.map(t => t.trim()).filter(t => t.length > 0)
        )]; // 중복 제거 및 공백 제거

        for (const tagName of cleanTagNames) {
            const tag = await prisma.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName }
            });

            await prisma.sentenceTag.create({
                data: {
                    sentenceId: sentence.id,
                    tagId: tag.id
                }
            });
        }

        const result = await prisma.sentence.findUnique({
            where: { id: sentence.id },
            include: {
                sentenceWords: {
                    orderBy: { order: 'asc' },
                    include: { word: true }
                },
                sentenceTags: {
                    include: { tag: true }
                }
            }
        })

        return Response.json(result, { status: 201 });

    } catch (error: any) {
        if (error.code === 'P2002') {
            return Response.json(
                { error: '이미 등록된 문장이에요.' },
                { status: 409 } // 409: Conflict (충돌)
            );
        }
        console.error(error);
        return Response.json(
            { error: '문장 저장 중 오류가 발생했어요.' },
            { status: 500 }
        );
    }
} 