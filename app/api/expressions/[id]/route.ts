// app/api/expressions/[id]/route.ts

import { prisma } from "@/lib/prisma";

// 표현 수정 (내용, 뜻)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const expressionId = Number(id);
    const body = await request.json();
    const content: string | undefined = body.content?.trim();
    const meaning: string | undefined = body.meaning?.trim();

    if (!content && !meaning) {
        return Response.json(
            { error: '수정할 내용이 없어요.' },
            { status: 400 }
        );
    }

    try {
        const updated = await prisma.expression.update({
            where: { id: expressionId },
            data: {
                ...(content && { content }),
                ...(meaning && { meaning }),
            },
            include: {
                exampleLinks: { include: { sentence: true } }
            }
        });

        return Response.json(updated);

    } catch (error: any) {
        if (error.code === 'P2002') {
            return Response.json(
                { error: '이미 등록된 표현이에요.' },
                { status: 409 }
            );
        }
        if (error.code === 'P2025') {
            return Response.json(
                { error: '존재하지 않는 표현이에요.' },
                { status: 404 }
            );
        }
        console.error(error);
        return Response.json(
            { error: '표현 수정 중 오류가 발생했어요.' },
            { status: 500 }
        );
    }
}

// 표현 삭제 (연결된 예문 연결도 자동으로 같이 삭제됨, 예문 문장 자체는 유지)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const expressionId = Number(id);

    try {
        await prisma.expression.delete({
            where: { id: expressionId }
        });

        return Response.json({ message: '표현이 삭제되었어요.' });

    } catch (error: any) {
        if (error.code === 'P2025') {
            return Response.json(
                { error: '존재하지 않는 표현이에요.' },
                { status: 404 }
            );
        }
        console.error(error);
        return Response.json(
            { error: '표현 삭제 중 오류가 발생했어요.' },
            { status: 500 }
        );
    }
}