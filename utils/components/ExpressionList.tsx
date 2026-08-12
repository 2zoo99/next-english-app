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
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState('');
    const [editMeaning, setEditMeaning] = useState('');

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

    const startEdit = (exp: Expression) => {
        setEditingId(exp.id);
        setEditContent(exp.content);
        setEditMeaning(exp.meaning);
    }

    const cancelEdit = () => {
        setEditingId(null);
        setEditContent('');
        setEditMeaning('');
    }

    const saveEdit = async (id: number) => {
        const res = await fetch(`/api/expressions/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: editContent, meaning: editMeaning }),
        });

        if (res.ok) {
            const updated = await res.json();
            setItems(prev => prev.map(item => item.id === id ? updated : item));
            cancelEdit();
        } else {
            const data = await res.json();
            alert(data.error || '수정에 실패했어요.');
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('이 표현을 삭제할까요? 등록된 예문 목록에서도 사라져요.')) return;

        const res = await fetch(`/api/expressions/${id}`, { method: 'DELETE' });

        if (res.ok) {
            setItems(prev => prev.filter(item => item.id !== id));
        } else {
            alert('삭제에 실패했어요.');
        }
    }

    const handleRemoveExample = async (expressionId: number, sentenceId: number) => {
        const res = await fetch(`/api/expressions/${expressionId}/sentences`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sentenceId }),
        });

        if (res.ok) {
            setItems(prev => prev.map(item =>
                item.id === expressionId
                    ? { ...item, exampleLinks: item.exampleLinks.filter(link => link.sentence.id !== sentenceId) }
                    : item
            ));
        } else {
            alert('예문 삭제에 실패했어요.');
        }
    }


    return (
        <div className="max-w-lg mx-auto mt-8 flex flex-col gap-3">
            {items.map((exp) => (
                <div key={exp.id} className="p-4 bg-white rounded-xl border shadow-sm">
                    {editingId === exp.id ? (
                        // 🆕 수정 모드 화면
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                value={editMeaning}
                                onChange={(e) => setEditMeaning(e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => saveEdit(exp.id)}
                                    className="px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                                >
                                    저장
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 border rounded-md"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    ) : (
                        // 기본 보기 모드
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">{exp.content}</p>
                                <p className="text-gray-500 text-sm mt-0.5">{exp.meaning}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button
                                    onClick={() => startEdit(exp)}
                                    className="text-xs text-gray-400 hover:text-blue-600 px-2 py-1"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="text-xs text-gray-400 hover:text-red-500 px-2 py-1"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    )}

                    {exp.exampleLinks.length > 0 && (
                        <div className="mt-3 pl-3 border-l-2 border-blue-100 flex flex-col gap-1.5">
                            {exp.exampleLinks.map((link) => (
                                <div key={link.id} className="flex items-start justify-between text-sm group">
                                    <div>
                                        <p className="text-gray-700">{link.sentence.content}</p>
                                        {link.sentence.translate && (
                                            <p className="text-gray-400 text-xs">{link.sentence.translate}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveExample(exp.id, link.sentence.id)}
                                        className="text-xs text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

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