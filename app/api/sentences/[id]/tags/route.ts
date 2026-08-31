// Next.js의 App Router 에서는 폴더 경로 하나당 route.ts 파일 하나가 대응된다. 그리고 그 URL 경로로 들어오는 요청만 처리한다.
// 즉, route.ts 파일은 각각 담당하는게 다른 '문' 인 것이다.

// 문장에 태그 붙이기/떼기
// /app/api/sentences/[id]/tags/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import { cleanupOrphanTags } from "@/utils/cleanupOrphanTags";



export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }
    const { id } = await params;
    const sentenceId = Number(id);

    // 이 문장이 실제로 로그인한 사용자 소유인지(또는 관리자 것인지) 확인
    const sentence = await prisma.sentence.findUnique({
        where: { id: sentenceId }
    });

    if (!sentence) {
        return Response.json({ error: '존재하지 않는 문장이에요.' }, { status: 404 });
    }

    const canEdit = sentence.userId === currentUser.id || currentUser.role === 'ADMIN';
    if (!canEdit) {
        return Response.json({ error: '이 문장을 수정할 권한이 없어요.' }, { status: 403 });
    }

    const body = await request.json();
    const tagName: string = body.tagName?.trim();

    if (!tagName) {
        return Response.json({ error: "태그이름을 정해주세요." }, { status: 400 });
    }

    try {
        // 태그가 존재하면 그거 쓰고 없으면 새로 생성
        const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName }
        });

        //문장-태그 관계 연결
        await prisma.sentenceTag.create({
            data: {
                sentenceId,
                tagId: tag.id
            }
        });

        //최신 상태 문장 다시 조회해서 반환
        const result = await prisma.sentence.findUnique({
            where: { id: sentenceId },
            include: { sentenceTags: { include: { tag: true } } }
        });

        return Response.json(result, { status: 201 });

    } catch (error: any) {
        // 이미 같은 태그가 붙어있으면 P2002 에러가 발생한다. 이때는 그냥 409 Conflict로 처리한다.
        if (error.code === 'P2002') {
            return Response.json(
                { error: '이미 붙어있는 태그에요.' },
                { status: 409 } // 409: Conflict (충돌)
            )
        }
        console.error(error);
        return Response.json(
            { error: '태그를 붙이는 중에 문제가 발생했습니다.' },
            { status: 500 }
        );
    }
}

// 태그 제거 API
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: '로그인이 필요해요.' }, { status: 401 });
    }
    // 삭제할 문장 id와 태그 이름을 받아온다.
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
        return Response.json({ error: '이 문장을 수정할 권한이 없어요.' }, { status: 403 });
    }
    const body = await request.json();
    const tagId: number = body.tagId;

    if (!tagId) {
        return Response.json({ error: "태그아이디를 정해주세요." }, { status: 400 });
    }
    try {
        await prisma.sentenceTag.deleteMany({
            where: { sentenceId, tagId }
        });
        await cleanupOrphanTags([tagId]);
        return Response.json({ message: "태그가 제거되었습니다." });
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: '태그를 제거하는 중에 문제가 발생했습니다.' },
            { status: 500 }
        );
    }
}