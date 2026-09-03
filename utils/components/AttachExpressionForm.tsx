'use client'

import { useState, useRef, useEffect } from 'react'

type ExpressionOption = {
    id: number;
    content: string;
    meaning: string;
}

interface Props {
    sentenceId: number;
    sentenceContent: string;
    onAttached: () => void;
    onCancel: () => void;
}

export default function AttachExpressionForm({ sentenceId, sentenceContent, onAttached, onCancel }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ExpressionOption[]>([]);
    const [selected, setSelected] = useState<ExpressionOption | null>(null);
    const [selection, setSelection] = useState<{ start: number; end: number; text: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const q = query.trim();
        if (!q) { setResults([]); return; }
        debounceRef.current = setTimeout(async () => {
            const res = await fetch(`/api/expressions?q=${encodeURIComponent(q)}`);
            if (res.ok) {
                const data = await res.json();
                setResults(data.expressions);
            }
        }, 300);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [query]);

    function handleMouseUp(e: React.MouseEvent<HTMLParagraphElement>) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
        const range = sel.getRangeAt(0);
        const container = e.currentTarget;
        if (!container.contains(range.commonAncestorContainer)) return;

        const preRange = document.createRange();
        preRange.selectNodeContents(container);
        preRange.setEnd(range.startContainer, range.startOffset);
        const start = preRange.toString().length;
        const end = start + range.toString().length;

        setSelection({ start, end, text: range.toString() });
        sel.removeAllRanges();
    }

    async function handleSubmit() {
        setError('');
        if (!selected) {
            setError('표현을 먼저 선택해주세요.');
            return;
        }
        if (!selection) {
            setError('문장에서 표현이 쓰인 부분을 드래그로 선택해주세요.');
            return;
        }
        setSubmitting(true);
        const res = await fetch(`/api/expressions/${selected.id}/sentences`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sentenceId,
                startIndex: selection.start,
                endIndex: selection.end,
            }),
        });
        setSubmitting(false);
        if (res.ok) {
            onAttached();
        } else {
            const data = await res.json();
            setError(data.error || '연결에 실패했어요.');
        }
    }

    return (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col gap-2">
            {!selected ? (
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="연결할 표현을 검색하세요"
                        className="w-full px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {query.trim() && (
                        <ul className="mt-1 border border-gray-200 dark:border-gray-700 rounded-lg max-h-40 overflow-y-auto bg-background">
                            {results.length === 0 && (
                                <li className="px-3 py-2 text-sm text-gray-400">검색 결과가 없어요.</li>
                            )}
                            {results.map(exp => (
                                <li key={exp.id}>
                                    <button
                                        type="button"
                                        onClick={() => { setSelected(exp); setQuery(''); setResults([]); }}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <span className="font-medium">{exp.content}</span>
                                        <span className="text-gray-400 ml-1">- {exp.meaning}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-sm">
                            선택한 표현: <span className="font-medium text-blue-600 dark:text-blue-400">{selected.content}</span>
                        </p>
                        <button
                            type="button"
                            onClick={() => { setSelected(null); setSelection(null); }}
                            className="text-xs text-gray-400 hover:text-red-500"
                        >
                            다시 선택
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        아래 문장에서 표현이 쓰인 부분을 드래그로 선택하세요
                    </p>
                    <p
                        onMouseUp={handleMouseUp}
                        className="select-text cursor-text px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm leading-relaxed"
                    >
                        {sentenceContent}
                    </p>
                    {selection && (
                        <p className="text-xs text-blue-500">선택됨: &quot;{selection.text}&quot;</p>
                    )}
                </>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex gap-2 justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                >
                    취소
                </button>
                {selected && (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md disabled:opacity-50"
                    >
                        {submitting ? '연결 중...' : '연결하기'}
                    </button>
                )}
            </div>
        </div>
    )
}