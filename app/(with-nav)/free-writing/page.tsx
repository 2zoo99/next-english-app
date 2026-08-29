// app/(with-nav)/free-writing/page.tsx

'use client'

import { useState, useEffect, useCallback } from 'react'
import FreeWritingForm from '@/utils/components/FreeWritingForm'
import FreeWritingList from '@/utils/components/FreeWritingList'

type FreeWriting = {
    id: number;
    korean: string;
    english: string;
    createdAt: string;
}

export default function FreeWritingPage() {
    const [writings, setWritings] = useState<FreeWriting[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWritings = useCallback(async () => {
        const res = await fetch('/api/free-writings');
        if (res.ok) {
            const data = await res.json();
            setWritings(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchWritings();
    }, [fetchWritings]);

    return (
        <div className="px-4 py-6 flex flex-col gap-6">
            <FreeWritingForm
                onCreated={(newWriting) => setWritings(prev => [newWriting, ...prev])}
            />

            <div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">내 작성 기록</h3>
                {loading ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500">불러오는 중...</p>
                ) : (
                    <FreeWritingList
                        writings={writings}
                        onDelete={(id) => setWritings(prev => prev.filter(w => w.id !== id))}
                    />
                )}
            </div>
        </div>
    )
}