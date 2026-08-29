// app/api/flashcards/route.ts

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import { visibilityWhere } from "@/utils/auth/visibilityWhere";

export async function GET(request: Request) {
    const currentUser = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const favoritesOnly = searchParams.get('favoritesOnly') === 'true';

    const visibility = visibilityWhere(
        currentUser ? { id: currentUser.id, role: currentUser.role } : null
    );

    const expressions = await prisma.expression.findMany({
        where: {
            AND: [
                visibility,
                ...(favoritesOnly && currentUser
                    ? [{ favoritedBy: { some: { userId: currentUser.id } } }]
                    : [])
            ]
        },
        orderBy: { createdAt: 'desc' },
        include: {
            favoritedBy: currentUser
                ? { where: { userId: currentUser.id } }
                : false
        }
    });

    const result = expressions.map(exp => ({
        id: exp.id,
        content: exp.content,
        meaning: exp.meaning,
        isFavorite: exp.favoritedBy.length > 0,
    }));

    return Response.json(result);
}