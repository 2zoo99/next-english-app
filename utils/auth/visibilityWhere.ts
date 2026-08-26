// utils/auth/visibilityWhere.ts

// "관리자가 만든 것 + 내가 만든 것"만 보이도록 하는 where 조건
export function visibilityWhere(currentUser: { id: number; role: string } | null) {
    if (!currentUser) {
        return { user: { role: 'ADMIN' } };
    }
    if (currentUser.role === 'ADMIN') {
        // 관리자는 필터 없이 전체 조회
        return {};
    }
    return {
        OR: [
            { user: { role: 'ADMIN' } },
            { userId: currentUser.id },
        ],
    };
}