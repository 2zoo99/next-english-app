import { prisma } from "@/lib/prisma";

//전체 조회 함수
export async function GET() {
    const users = await prisma.user.findMany();
    return Response.json(users);
}

//생성 함수
export async function POST(request: Request) {
    const body = await request.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    return Response.json(user, { status: 201 });
}

