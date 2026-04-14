// app/api/sentences/route.ts

import { prisma } from "@/lib/prisma";

// 전체 조회
export async function GET() {
    const sentences = await prisma.sentence.findMany({
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            }
        }
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
            .replace(/[^a-zA-Z0-9가-힣']/g, '') // 특수문자, 공백 제거
            .toLowerCase();                      // 소문자화
    }
    const words = content
        .split(' ')                          // 공백으로 단어 분리
        .map((word: string) => normalize(word))  // 전처리
        .filter((word: string) => word.length > 0) // 빈 문자열 제거

    console.log('추출된 단어들:', words); // 임시 코드

    // 문장 생성
    const sentence = await prisma.sentence.create({
        data: {
            content,
            translate,
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

    const result = await prisma.sentence.findUnique({
        where: { id: sentence.id },
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            }
        }
    })

    return Response.json(result, { status: 201 });

}