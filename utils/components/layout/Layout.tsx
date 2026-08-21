// utils/components/layout/Layout.tsx
'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">

            <Topbar onMenuClick={() => setIsOpen(true)} />
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <footer className="text-center py-4 text-sm text-gray-500">© 2026 Kkung Co. All rights reserved.</footer>
        </div>
    )
}