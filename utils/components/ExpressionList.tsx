// utils/components/ExpressionList.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type Sentence = {
    id: number;
    content: string;
    translate: string;
}
type ExampleLink = {
    id: number;
    sentence: Sentence;
}
type Expression = {
    id: number;
    content: string;
    meaning: string;
    exampleLinks: ExampleLink[];
}

export interface ExpressionListHandle {
    refresh: () => void;
}

export default function ExpressionList() {
    const [items, setItems] = useState<Expression[]>([]);
    const [cursor, setCursor] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);

    const loadMore = useCallback(async (reset = false) => {
        if (loadingRef.current) return;
        if (!reset && !hasMore) return;

        loadingRef.current = true;
        setLoading(true);
        const url = reset || !cursor
            ? '/api/expressions'
            : `/api/expressions?cursor=${cursor}`;

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            setItems(prev => reset ? data.expressions : [...prev, ...data.expressions]);
            setCursor(data.nextCursor);
            setHasMore(data.nextCursor !== null);
        }
        setLoading(false);
        loadingRef.current = false;
        setInitialized(true);
    }, [cursor, hasMore, loading]);

    // 처음 마운트 시 첫 페이지 로드
    useEffect(() => {
        loadMore(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 스크롤 감지: 목록 맨 아래의 감시용 div가 화면에 보이면 다음 페이지 요청
    useEffect(() => {
        if (!initialized) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        const currentTarget = observerRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [loadMore, hasMore, initialized]);

    return (
        <div className="max-w-lg mx-auto mt-8 flex flex-col gap-3">
            {items.map((exp) => (
                <div key={exp.id} className="p-4 bg-white rounded-xl border shadow-sm">
                    <p className="font-semibold text-gray-800">{exp.content}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{exp.meaning}</p>

                    {exp.exampleLinks.length > 0 && (
                        <div className="mt-3 pl-3 border-l-2 border-blue-100 flex flex-col gap-1.5">
                            {exp.exampleLinks.map((link) => (
                                <div key={link.id} className="text-sm">
                                    <p className="text-gray-700">{link.sentence.content}</p>
                                    {link.sentence.translate && (
                                        <p className="text-gray-400 text-xs">{link.sentence.translate}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* 이 div가 화면에 보이면 다음 페이지를 자동으로 불러옴 */}
            <div ref={observerRef} className="h-4" />

            {loading && (
                <p className="text-center text-sm text-gray-400 py-4">불러오는 중...</p>
            )}
            {!hasMore && items.length > 0 && (
                <p className="text-center text-sm text-gray-400 py-4">모든 표현을 다 봤어요.</p>
            )}
        </div>
    )
}