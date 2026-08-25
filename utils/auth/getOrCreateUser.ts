import { prisma } from '@/lib/prisma'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export async function getOrCreateUser(supabaseUser: SupabaseUser) {
    const name =
        supabaseUser.user_metadata?.full_name ??
        supabaseUser.user_metadata?.name ??
        null;

    // supabaseId로 먼저 찾아봄
    const existingBySupabaseId = await prisma.user.findUnique({
        where: { supabaseId: supabaseUser.id },
    });
    if (existingBySupabaseId) return existingBySupabaseId;

    // 없으면 email로도 찾아봄 (다른 로그인 수단으로 이미 가입된 경우)
    const existingByEmail = await prisma.user.findUnique({
        where: { email: supabaseUser.email! },
    });
    if (existingByEmail) {
        // 같은 사람이 다른 방식으로 로그인한 것 → supabaseId만 최신 걸로 갱신하지 않고 그대로 반환
        // (하나의 supabaseId만 저장 가능한 구조라서, 최초 로그인 수단의 supabaseId를 그대로 유지)
        return existingByEmail;
    }

    // 둘 다 없으면 진짜 새 사용자
    return prisma.user.create({
        data: {
            supabaseId: supabaseUser.id,
            email: supabaseUser.email!,
            name,
        },
    });
}