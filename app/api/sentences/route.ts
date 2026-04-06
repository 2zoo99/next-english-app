// app/api/sentences/route.ts

import { prisma } from "@/lib/prisma";

// 전체 조회
export async function GET() {
    const sentences = await prisma.sentence.findMany({
        include: { words: { orderBy: { order: 'asc' } } }
    })
    return Response.json(sentences);
}

// 생성
export async function POST(request: Request) {
    const body = await request.json();
    const content: string = body.content;
    const translate: string = body.translate || '';
    // content는 필수, translate는 선택으로 받음. translate가 없으면 빈 문자열로 처리.

    const normalize = (word: string) => {
        return word
            .replace(/[^a-zA-Z0-9가-힣]/g, '') // 특수문자, 공백 제거
            .toLowerCase();                      // 소문자화
    }
    const words = content
        .split(' ')                          // 공백으로 단어 분리
        .map((word: string) => normalize(word))  // 전처리
        .filter((word: string) => word.length > 0) // 빈 문자열 제거

    const sentence = await prisma.sentence.create({
        data: {
            content,
            translate,
            words: {
                create: words.map((word, index) => ({
                    word,
                    order: index + 1,
                }))
            }
        },
        include: { words: { orderBy: { order: 'asc' } } }
    })

    return Response.json(sentence, { status: 201 });

}