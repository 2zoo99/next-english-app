// app/api/expressions/route.ts
// 자주 사용하는 표현 목록 조회, 생성 API 

import { prisma } from "@/lib/prisma";   // Prisma 클라이언트: DB에 접속하는 객체 임포트
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import { visibilityWhere } from "@/utils/auth/visibilityWhere";


const PAGE_SIZE = 10;

// 전체 데이터 조회: 커서 기반 페이지네이션 사용 
export async function GET(request: Request) {
    const currentUser = await getCurrentUser();
    // 비동기로 GET 요청을 처리하는 함수 정의
    const { searchParams } = new URL(request.url);
    // URL 클래스는 자바스크립트 기본 클래스로, 주소를 분석 / 주소의 쿼리 파라미터를 다룰때 사용
    const cursor = searchParams.get('cursor');
    const query = searchParams.get('q')?.trim();      // 검색 기능에 활용
    const visibility = visibilityWhere(currentUser ? { id: currentUser.id, role: currentUser.role } : null);


    const expressions = await prisma.expression.findMany({
        // 데이터를 가져오는 시간을 await 로 기다림
        take: PAGE_SIZE,
        ...(cursor && {
            skip: 1,
            cursor: { id: Number(cursor) }
        }),
        where: {
            AND: [
                visibility,
                ...(query ? [{
                    OR: [
                        { content: { contains: query, mode: 'insensitive' as const } },
                        { meaning: { contains: query, mode: 'insensitive' as const } }
                    ]
                }] : [])
            ]
        },
        orderBy: { createdAt: 'desc' }, // 생성일 기준 내림차순 정렬
        include: {
            exampleLinks: {
                include: { sentence: true } // exampleLinks 테이블과 연결된 sentence 데이터도 포함
            }
        }
    });
    const nextCursor = expressions.length === PAGE_SIZE
        ? expressions[expressions.length - 1].id
        : null;     // 더 가져올 데이터가 없으면 null 저장
    return Response.json({ expressions, nextCursor });
}

export async function POST(request: Request) { // 비동기로 POST 요청을 처리하는 함수 정의
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json(
            { error: '로그인이 필요해요.' },
            { status: 401 }
        );
    }

    const body = await request.json();
    const content: string = body.content?.trim(); // 요청 본문에서 content 추출
    const meaning: string = body.meaning?.trim();

    if (!content || !meaning) { // content 또는 meaning이 없으면
        return Response.json(
            { error: '표현과 뜻은 필수로 작성해주세요.' },
            { status: 400 }
        );
    }

    try {
        const expression = await prisma.expression.create({
            data: { content, meaning, userId: currentUser.id }   // userId 추가
        });
        return Response.json(expression, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return Response.json(
                { error: '이미 등록된 표현입니다.' },
                { status: 409 }
            );
        }
        console.error(error);
        return Response.json(
            { error: '표현 저장 중에 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
