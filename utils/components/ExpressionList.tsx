// utils/components/ExpressionList.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import AddExampleForm from './AddExampleForm'

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
    const [addingExampleFor, setAddingExampleFor] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const loadMore = useCallback(async (reset = false) => {
        if (loadingRef.current) return;
        if (!reset && !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        const params = new URLSearchParams();
        if (!reset && cursor) params.set('cursor', String(cursor));
        if (searchQuery.trim()) params.set('q', searchQuery.trim());

        const url = `/api/expressions?${params.toString()}`;

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
    }, [cursor, hasMore, loading, searchQuery]);

    // 검색어가 바뀔 때마다 (또는 처음 마운트 시) 첫 페이지부터 다시 조회
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            loadMore(true);
        }, 300);
        // 타이핑 멈춘 뒤 300ms 후 검색 : 300ms 후 추가 입력이 없을때만 검색하면 서버 부담 및 비용이 감소함.

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

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
        <div className="mx-auto mt-8 flex flex-col gap-3">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Type for searching items... '
                className='px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400' />
            {items.map((exp) => (
                <div key={exp.id} className="p-4 bg-background border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                    {editingId === exp.id ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                value={editMeaning}
                                onChange={(e) => setEditMeaning(e.target.value)}
                                className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => saveEdit(exp.id)}
                                    className="px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md"
                                >
                                    저장
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{exp.content}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{exp.meaning}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button
                                    onClick={() => startEdit(exp)}
                                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 px-2 py-1"
                                >
                                    삭제
                                </button>
                                <button
                                    onClick={() => setAddingExampleFor(exp.id)}
                                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 px-2 py-1"
                                >
                                    예문 추가
                                </button>
                            </div>
                        </div>
                    )}

                    {exp.exampleLinks.length > 0 && (
                        <div className="mt-3 pl-3 border-l-2 border-blue-100 dark:border-blue-900 flex flex-col gap-1.5">
                            {exp.exampleLinks.map((link) => (
                                <div key={link.id} className="flex items-start justify-between text-sm group">
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300">{link.sentence.content}</p>
                                        {link.sentence.translate && (
                                            <p className="text-gray-400 dark:text-gray-500 text-xs">{link.sentence.translate}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveExample(exp.id, link.sentence.id)}
                                        className="text-xs text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity px-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {addingExampleFor === exp.id && (
                        <AddExampleForm
                            expressionId={exp.id}
                            onCancel={() => setAddingExampleFor(null)}
                            onAdded={(updated) => {
                                setItems(prev => prev.map(item => item.id === updated.id ? updated : item));
                                setAddingExampleFor(null);
                            }}
                        />
                    )}
                </div>
            ))}

            <div ref={observerRef} className="h-4" />

            {loading && (
                <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-4">불러오는 중...</p>
            )}
            {!hasMore && items.length > 0 && (
                <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-4">모든 표현을 다 봤어요.</p>
            )}
        </div>
    )
}