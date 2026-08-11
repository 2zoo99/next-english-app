import Layout from "@/utils/components/layout/Layout"
import { RefreshProvider } from "@/utils/context/RefreshContext"
//with-nav는 navigation bar가 있는 레이아웃을 의미합니다.
//web에서 navigation bar가 있는 레이아웃을 사용하고 싶을 때, 이 레이아웃을 사용하면 됩니다.

export default function WithNavLayout({ children }: { children: React.ReactNode }) {
    return (
        <RefreshProvider>
            <Layout>
                {children}
            </Layout>
        </RefreshProvider>
    )

}