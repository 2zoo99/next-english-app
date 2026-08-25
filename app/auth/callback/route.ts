import { NextResponse } from 'next/server'
import createClient from '@/utils/supabase/server'
import { getOrCreateUser } from '@/utils/auth/getOrCreateUser'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('exchangeCodeForSession 실패:', error);
        } else if (data.user) {
            try {
                const user = await getOrCreateUser(data.user);
                console.log('User 동기화 성공:', user);
            } catch (e) {
                console.error('getOrCreateUser 실패:', e);
            }
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}