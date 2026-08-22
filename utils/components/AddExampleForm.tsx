// /utils/components/AddExampleForm.tsx
'use client'

import { useState } from 'react'

interface Props {
    expressionId: number;
    onAdded: (unpdatedExpression: any) => void;
    onCancel: () => void;
}

export default function AddExampleForm({
    expressionId, onAdded, onCancel
}: Props) {
    const [content, setContent] = useState('');
    const [translate, setTranslate] = useState('');
    const [selection, setSelection] = useState<{ start: number; end: number; text: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

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
        if (!content.trim()) {
            setError('문장을 입력해주세요.');
            return;
        }
        if (!selection) {
            setError('문장 안에서 표현 부분을 드래그로 선택해주세요.');
            return;
        }

        setSubmitting(true);
        const res = await fetch(`/api/expressions/${expressionId}/sentences`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                translate,
                startIndex: selection.start,
                endIndex: selection.end,
            }),
        });
        setSubmitting(false);
        if (res.ok) {
            const updated = await res.json();
            onAdded(updated);
        } else {
            const data = await res.json();
            setError(data.error || '등록에 실패했어요.');
        }
    }
    return (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col gap-2">
            <textarea
                value={content}
                onChange={(e) => { setContent(e.target.value); setSelection(null); }}
                placeholder="예문을 입력하세요"
                rows={2}
                className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                value={translate}
                onChange={(e) => setTranslate(e.target.value)}
                placeholder="번역 (선택)"
                className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {content.trim() && (
                <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                        아래 문장에서 표현 부분을 드래그로 선택하세요
                    </p>
                    <p
                        onMouseUp={handleMouseUp}
                        className="select-text cursor-text px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm leading-relaxed"
                    >
                        {content}
                    </p>
                    {selection && (
                        <p className="text-xs text-blue-500 mt-1">
                            선택됨: &quot;{selection.text}&quot;
                        </p>
                    )}
                </div>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex gap-2 justify-end">
                <button
                    onClick={onCancel}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                >
                    취소
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                    {submitting ? '등록 중...' : '등록'}
                </button>
            </div>
        </div>

    )
}