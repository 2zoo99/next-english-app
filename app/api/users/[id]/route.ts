import { prisma } from "@/lib/prisma";

// 단건 조회 함수
export async function GET(
    //[id]/route.ts의 GET 함수가 호출되면 Request 객체와 params 객체가 전달된다. Request 객체는 HTTP 요청에 대한 정보를 담고 있고, params 객체는 URL 경로에서 추출된 매개변수를 포함한다.
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    })
    return Response.json(user);
}

// 수정 함수
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: body
    })
    return Response.json(user);
}

// 삭제 함수 
export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await prisma.user.delete({
        where: { id: Number(id) }
    })
    return new Response(null, { status: 204 });
}