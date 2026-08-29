// app/(with-nav)/common-expression/page.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import ExpressionForm from '@/utils/components/ExpressionForm'
import ExpressionList from '@/utils/components/ExpressionList'

export default function CommonExpressionPage() {
    const [listKey, setListKey] = useState(0);
    return (
        <div className="px-4 py-6">
            <div className="flex justify-end mb-4">
                <Link
                    href="/flashcards"
                    className="px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg transition-colors"
                >
                    📇 낱말 카드로 연습하기
                </Link>
            </div>
            <ExpressionForm onCreated={() => setListKey(prev => prev + 1)} />
            <ExpressionList key={listKey} />
        </div>
    )
}