import Layout from "@/utils/components/layout/Layout"

export default function WithNavLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            {children}
        </Layout>
    )
}