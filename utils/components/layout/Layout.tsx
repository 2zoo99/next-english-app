// utils/components/layout/Layout.tsx
'use client'

import { useState } from 'react'
import type { User } from '@supabase/supabase-js'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface Props {
    children: React.ReactNode;
    user: User | null;
}

export default function Layout({ children, user }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">

            <Topbar onMenuClick={() => setIsOpen(true)} user={user} />
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <footer className="text-center py-4 text-sm text-gray-500">© 2026 Kkung Co. All rights reserved.</footer>
        </div>
    )
}