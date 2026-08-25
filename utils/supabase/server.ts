// utils/supabase/server.ts

// 서버 컴포넌트 / API 라우트 용

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // 서버 컴포넌트에서 호출되면 쓰기가 안 될 수 있음.
                        // 미들웨어가 세션 갱신을 대신 처리하니 무시해도 됨.
                    }
                },
            },
        }
    )
}