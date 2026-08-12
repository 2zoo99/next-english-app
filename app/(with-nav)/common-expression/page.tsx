// app/(with-nav)/common-expression/page.tsx

'use client'

import { useState } from 'react'
import ExpressionForm from '@/utils/components/ExpressionForm'
import ExpressionList from '@/utils/components/ExpressionList'

export default function CommonExpressionPage() {
    const [listKey, setListKey] = useState(0);
    return (
        <div className="px-4 py-6">
            <ExpressionForm onCreated={() => setListKey(prev => prev + 1)} />
            <ExpressionList key={listKey} />
        </div>
    )
}