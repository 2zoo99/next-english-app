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

    const wordList = content.split(' ').filter(w => w !== '');
    //공백으로 구분하여 단어 리스트 생성

    const sentence = await prisma.sentence.create({
        data: {
            content,
            translate,
            words: {
                create: wordList.map((word, index) => ({
                    word,
                    order: index + 1,
                }))
            }
        },
        include: { words: { orderBy: { order: 'asc' } } }
    })

    return Response.json(sentence, { status: 201 });

}