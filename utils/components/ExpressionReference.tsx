// utils/components/ExpressionReference.tsx

'use client'

import { useState, useEffect, useRef } from 'react'

type Expression = {
    id: number;
    content: string;
    meaning: string;
}

export default function ExpressionReference() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Expression[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        const q = query.trim();
        if (!q) {
            setResults([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            const res = await fetch(`/api/expressions?q=${encodeURIComponent(q)}`);
            if (res.ok) {
                const data = await res.json();
                setResults(data.expressions);
            }
            setLoading(false);
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    return (
        <div ref={wrapperRef} className="relative">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
                표현 참고하기
            </label>
            <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                placeholder="등록한 표현을 검색해보세요"
                className="w-full px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {showDropdown && query.trim() && (
                <ul className="absolute top-full mt-1 w-full bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10 max-h-56 overflow-y-auto">
                    {loading && (
                        <li className="px-3 py-2 text-sm text-gray-400">검색 중...</li>
                    )}
                    {!loading && results.length === 0 && (
                        <li className="px-3 py-2 text-sm text-gray-400">검색 결과가 없어요.</li>
                    )}
                    {!loading && results.map(exp => (
                        <li key={exp.id} className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-none">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{exp.content}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{exp.meaning}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}