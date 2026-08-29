// utils/components/FreeWritingList.tsx

'use client'

import { useState, useEffect } from 'react'
import { LineNumberedText } from './LineNumberedText';

type FreeWriting = {
    id: number;
    korean: string;
    english: string;
    createdAt: string;
}

interface Props {
    writings: FreeWriting[];
    onDelete: (id: number) => void;
}

const PAGE_SIZE = 1;   // 한 페이지에 하나씩

export default function FreeWritingList({ writings, onDelete }: Props) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(writings.length / PAGE_SIZE));

    // 삭제 등으로 목록이 줄어들어 현재 페이지가 범위를 벗어나면 보정
    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    async function handleDelete(id: number) {
        const res = await fetch(`/api/free-writings/${id}`, { method: 'DELETE' });
        if (res.ok) {
            onDelete(id);
        }
    }

    if (writings.length === 0) {
        return (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
                아직 작성한 기록이 없어요.
            </p>
        );
    }

    const startIndex = (page - 1) * PAGE_SIZE;
    const currentItems = writings.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <div className="flex flex-col gap-3">
            {/* 페이지네이션 컨트롤 */}
            <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                <p className="text-xs text-gray-400 dark:text-gray-500 order-2 sm:order-1">
                    {page} / {totalPages} 페이지
                </p>

                <div className="flex items-center justify-center gap-1 flex-wrap order-1 sm:order-2">
                    <button
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        «
                    </button>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
                            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis');
                            acc.push(p);
                            return acc;
                        }, [])
                        .map((p, i) =>
                            p === 'ellipsis' ? (
                                <span key={`e${i}`} className="px-1 text-sm text-gray-300 dark:text-gray-600">…</span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 text-sm rounded-md transition-colors shrink-0 ${p === page
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {p}
                                </button>
                            )
                        )}

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                        className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        »
                    </button>
                </div>
            </div>

            {currentItems.map(w => (
                <div key={w.id} className="p-4 bg-background border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                    <div className="flex flex-col gap-2">
                        <LineNumberedText text={w.korean} />
                        <LineNumberedText text={w.english} />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-300 dark:text-gray-600">
                            {new Date(w.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                        <button
                            onClick={() => handleDelete(w.id)}
                            className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 px-2 py-1 -mr-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}