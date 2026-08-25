// utils/auth/getCurrentUser.ts

import { prisma } from '@/lib/prisma'
import createClient from '@/utils/supabase/server'

// 로그인 안 했으면 null 반환
export async function getCurrentUser() {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    if (!supabaseUser) return null;

    return prisma.user.findUnique({
        where: { supabaseId: supabaseUser.id },
    });
}