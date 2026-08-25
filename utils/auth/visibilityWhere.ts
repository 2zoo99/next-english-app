// utils/auth/visibilityWhere.ts

// "관리자가 만든 것 + 내가 만든 것"만 보이도록 하는 where 조건
export function visibilityWhere(currentUserId: number | null) {
    if (currentUserId === null) {
        // 로그인 안 했으면 관리자(공개) 콘텐츠만
        return { user: { role: 'ADMIN' } };
    }
    return {
        OR: [
            { user: { role: 'ADMIN' } },
            { userId: currentUserId },
        ],
    };
}