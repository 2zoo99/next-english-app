// utils/components/FreeWritingForm.tsx


'use client'

import { useState } from 'react'
import { AutoResizeTextarea } from './AutoResizeTextarea'
import ExpressionReference from './ExpressionReference'
import { LineNumberedTextarea } from './LineNumberedTextarea'

type FreeWriting = {
    id: number;
    korean: string;
    english: string;
    createdAt: string;
}

interface Props {
    onCreated: (writing: FreeWriting) => void;
}

export default function FreeWritingForm({ onCreated }: Props) {
    const [korean, setKorean] = useState('');
    const [english, setEnglish] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit() {
        if (!korean.trim() || !english.trim() || submitting) return;
        setSubmitting(true);
        setMessage('');

        const res = await fetch('/api/free-writings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ korean, english }),
        });

        if (res.ok) {
            const data = await res.json();
            onCreated(data);
            setKorean('');
            setEnglish('');
            setMessage('저장됐어요!');
            setIsSuccess(true);
        } else {
            const data = await res.json();
            setMessage(data.error || '저장에 실패했어요.');
            setIsSuccess(false);
        }
        setSubmitting(false);
    }

    return (
        <>
            <ExpressionReference />
            <div className="p-6 bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">자유 영작 연습</h2>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">한국어</label>
                    <LineNumberedTextarea
                        value={korean}
                        onChange={(e) => setKorean(e.target.value)}
                        placeholder="한국어로 자유롭게 문장을 작성해보세요"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">영어</label>
                    <LineNumberedTextarea
                        value={english}
                        onChange={(e) => setEnglish(e.target.value)}
                        placeholder="위 문장을 영어로 옮겨보세요"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!korean.trim() || !english.trim() || submitting}
                    className="py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {submitting ? '저장 중...' : '저장'}
                </button>

                {message && (
                    <p className={`text-sm ${isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                        {message}
                    </p>
                )}
            </div>
        </>
    )
}