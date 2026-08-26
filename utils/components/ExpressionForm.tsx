// utils/components/ExressionForm.tsx

'use client'

import { useState } from 'react'
import { AutoResizeTextarea } from './AutoResizeTextarea';

type ExampleInput = {
    content: string;
    translate: string;
}

interface Props {
    onCreated: () => void;  // 저장 성공하면 목록을 새로고침하기 위한 콜백 
}

export default function ExpressionForm({ onCreated }: Props) {
    const [content, setContent] = useState('');
    const [meaning, setMeaning] = useState('');
    const [examples, setExamples] = useState<ExampleInput[]>([]);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // 
    const handleAddExampleField = () => {
        setExamples(prev => [...prev, { content: '', translate: '' }]);
    }

    // 
    const handleRemoveExampleField = (index: number) => {
        setExamples(prev => prev.filter((_, i) => i !== index));
    }

    const handleExampleChange = (index: number, field: 'content' | 'translate', value: string) => {
        setExamples(prev => prev.map((ex, i) => i === index ? { ...ex, [field]: value } : ex));
    }

    const handleSubmit = async () => {
        if (!content.trim() || !meaning.trim()) return;
        setSubmitting(true);

        try {
            //표현 먼저 저장하기
            const res = await fetch('/api/expressions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, meaning }),
            });

            if (!res.ok) {
                const data = await res.json();
                setMessage(data.error || '표현 저장에 실패했습니다.');
                setIsSuccess(false);
                setSubmitting(false);
                return;
            }
            const expression = await res.json();

            //입력한 예문들 순서대로 등록
            const validExamples = examples.filter(ex => ex.content.trim().length > 0);

            for (const example of validExamples) {
                await fetch(`/api/expressions/${expression.id}/sentences`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: example.content,
                        translate: example.translate
                    }),
                });
            }

            setMessage('표현이 저장되었습니다.');
            setIsSuccess(true);
            setContent('');
            setMeaning('');
            setExamples([]);
            onCreated();    // 목록에 새로고침 요청
        } catch (error) {
            console.error(error);
            setMessage('저장 중에 오류가 발생했습니다.');
            setIsSuccess(false);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div className="mx-auto p-6 bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">표현 추가</h2>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">표현</label>
                    <AutoResizeTextarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="예: kick the bucket"
                        className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">뜻</label>
                    <AutoResizeTextarea
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        placeholder="예: 죽다"
                        className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* 동적으로 추가되는 예문 입력칸들 */}
                {examples.map((example, index) => (
                    <div key={index} className="flex flex-col gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">예문 {index + 1}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveExampleField(index)}
                                className="text-xs text-red-500 dark:text-red-400 hover:underline"
                            >
                                삭제
                            </button>
                        </div>
                        <AutoResizeTextarea
                            value={example.content}
                            onChange={(e) => handleExampleChange(index, 'content', e.target.value)}
                            placeholder="예문 (영어)"
                            className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <AutoResizeTextarea
                            value={example.translate}
                            onChange={(e) => handleExampleChange(index, 'translate', e.target.value)}
                            placeholder="번역 (선택)"
                            className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddExampleField}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline text-left"
                >
                    + 예문 추가하기
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!content.trim() || !meaning.trim() || submitting}
                    className="py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {submitting ? '저장 중...' : '저장'}
                </button>
            </div>

            {message && (
                <p className={`mt-3 text-sm ${isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {message}
                </p>
            )}
        </div>
    )
}