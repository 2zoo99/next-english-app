// utils/components/layout/Layout.tsx
'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-screen">

            <Topbar onMenuClick={() => setIsOpen(true)} />
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <main className="p-6">{children}</main>
            <footer className="text-center py-4 text-sm text-gray-500">© 2026 Kkung Co. All rights reserved.</footer>
        </div>
    )
}