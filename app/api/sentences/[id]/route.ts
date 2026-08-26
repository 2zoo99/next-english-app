// app/api/sentences/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";


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
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const { id } = await params;
    const sentenceId = Number(id);
    const sentence = await prisma.sentence.findUnique({
        where: { id: sentenceId }
    });
    if (!sentence) {
        return Response.json({ error: '존재하지 않는 문장이에요.' }, { status: 404 });
    }

    const canEdit = sentence.userId === currentUser.id || currentUser.role === 'ADMIN';
    if (!canEdit) {
        return Response.json({ error: '이 문장을 삭제할 권한이 없어요.' }, { status: 403 });
    }

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
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }

    const { id } = await params;
    const sentenceId = Number(id);
    const existingSentence = await prisma.sentence.findUnique({
        where: { id: sentenceId }
    });
    if (!existingSentence) {
        return Response.json({ error: '존재하지 않는 문장이에요.' }, { status: 404 });
    }

    const canEdit = existingSentence.userId === currentUser.id || currentUser.role === 'ADMIN';
    if (!canEdit) {
        return Response.json({ error: '이 문장을 수정할 권한이 없어요.' }, { status: 403 });
    }

    const { content, translate } = await request.json();

    const normalize = (word: string) => {
        return word.replace(/[^a-zA-Z0-9가-힣']/g, '') // 특수문자, 공백 제거
            .toLowerCase();                      // 소문자화
    }

    const updated = await prisma.sentence.update({
        where: { id: sentenceId },
        data: {
            //수정되는 것이기 때문에 content와 translate 중 하나만 수정할 수도 있다. 따라서 content와 translate가 존재할 때만 업데이트하도록 조건부로 작성한다.
            ...(content && { content }),
            ...(translate !== undefined && { translate }), //translate는 빈 문자열도 허용하기 때문에 undefined 여부로 체크한다.
        }
    })

    //content가 바뀌었으면 sentenceWords도 업데이트한다.
    if (content) {
        await prisma.sentenceWord.deleteMany({
            where: { sentenceId }
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
                    sentenceId,
                    wordId: word.id,
                    order: index + 1
                }
            })
        }
    }
    const result = await prisma.sentence.findUnique({
        where: { id: sentenceId },
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            }
        }
    });
    return Response.json(result);
}
