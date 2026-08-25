// app/(with-nav)/layout.tsx

import Layout from "@/utils/components/layout/Layout"
import { RefreshProvider } from "@/utils/context/RefreshContext"
import createClient from "@/utils/supabase/server"
import { getOrCreateUser } from "@/utils/auth/getOrCreateUser"


//with-nav는 navigation bar가 있는 레이아웃을 의미합니다.
//web에서 navigation bar가 있는 레이아웃을 사용하고 싶을 때, 이 레이아웃을 사용하면 됩니다.

export default async function WithNavLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        await getOrCreateUser(user);   // 로그인 방식 상관없이 여기서 동기화
    }
    return (
        <RefreshProvider>
            <Layout user={user}>
                {children}
            </Layout>
        </RefreshProvider>
    )

}