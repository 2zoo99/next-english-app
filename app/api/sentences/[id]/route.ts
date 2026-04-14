// app/api/sentences/[id]/route.ts
import { prisma } from "@/lib/prisma";

//조회
export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const sentence = await prisma.sentence.findUnique({
        where: { id: Number(id) },
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            }
        }
    })
    return Response.json(sentence);

}

//삭제
export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await prisma.sentence.delete({
        where: { id: Number(id) }
    })
    return new Response(null, { status: 204 });
}

//수정
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { content, translate } = await request.json();

    const normalize = (word: string) => {
        return word.replace(/[^a-zA-Z0-9가-힣']/g, '') // 특수문자, 공백 제거
            .toLowerCase();                      // 소문자화
    }

    const updated = await prisma.sentence.update({
        where: { id: Number(id) },
        data: {
            //수정되는 것이기 때문에 content와 translate 중 하나만 수정할 수도 있다. 따라서 content와 translate가 존재할 때만 업데이트하도록 조건부로 작성한다.
            ...(content && { content }),
            ...(translate !== undefined && { translate }), //translate는 빈 문자열도 허용하기 때문에 undefined 여부로 체크한다.
        }
    })

    //content가 바뀌었으면 sentenceWords도 업데이트한다.
    if (content) {
        await prisma.sentenceWord.deleteMany({
            where: { sentenceId: Number(id) }
        })

        //새 단어로 재생성
        const words = content
            .split(' ')
            .map((word: string) => normalize(word))
            .filter((word: string) => word.length > 0);
        for (const [index, w] of words.entries()) {
            const word = await prisma.word.upsert({
                where: { word: w },
                update: {},
                create: { word: w }
            });
            await prisma.sentenceWord.create({
                data: {
                    sentenceId: Number(id),
                    wordId: word.id,
                    order: index + 1
                }
            })
        }
    }
    const result = await prisma.sentence.findUnique({
        where: { id: Number(id) },
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            }
        }
    });
    return Response.json(result);
}
