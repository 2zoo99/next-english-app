//utils/components/SentenceForm.tsx

'use client'

import { useState, useRef } from 'react'
// useRef는 React에서 DOM 요소나 컴포넌트 인스턴스를 참조하기 위해 사용하는 훅입니다. 이 훅을 사용하면 특정 DOM 요소에 직접 접근하거나, 렌더링 사이클 동안 값이 유지되는 변수를 만들 수 있습니다. useRef를 사용하면 컴포넌트가 다시 렌더링될 때도 참조된 값이 유지되므로, 예를 들어 입력 필드에 포커스를 설정하거나, 이전 상태 값을 저장하는 등의 작업에 유용합니다.

type Word = {
    id: number;
    word: string;
    meaning: string | null;
}
type SentenceWord = {
    id: number;
    order: number;
    word: Word;
}
type Sentence = {
    id: number;
    content: string;
    translate: string;
    sentenceWords: SentenceWord[];
}

export default function SentenceForm() {
    const [content, setContent] = useState('');
    const [translate, setTranslate] = useState('');
    const [result, setResult] = useState<Sentence | null>(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // 성공 여부를 나타내는 상태 추가
    const translateRef = useRef<HTMLInputElement>(null);  // 포커스 이동용
    const contentRef = useRef<HTMLInputElement>(null);




    const handleSubmit = async () => {
        if (!content.trim()) return; // content가 비어있으면 제출하지 않음

        const res = await fetch('./api/sentences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, translate }),
        });

        if (res.ok) {
            const data = await res.json();
            setResult(data);
            setContent('');
            setTranslate('');
            setMessage('문장이 저장되었습니다.');
            setIsSuccess(true); // 성공 상태로 설정
            contentRef.current?.focus(); // content input에 포커스 이동
        }
        else {
            setMessage('문장 저장에 실패했습니다.');
            setIsSuccess(false); // 실패 상태로 설정
        }
    }

    const handleReset = () => {
        setContent('');
        setTranslate('');
        setResult(null);
        setMessage('');
        contentRef.current?.focus(); // content input에 포커스 이동
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">문장 추가</h2>

            <div className="flex flex-col gap-3">
                {/* 문장 입력 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">문장</label>
                    <input
                        ref={contentRef}
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') translateRef.current?.focus()  // 엔터 → 번역 입력칸으로 이동
                        }}
                        placeholder="영어 문장을 입력하세요"
                        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* 번역 입력 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">번역</label>
                    <input
                        ref={translateRef}
                        type="text"
                        value={translate}
                        onChange={(e) => setTranslate(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit()  // 엔터 → 바로 저장
                        }}
                        placeholder="한국어 번역을 입력하세요 (선택)"
                        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* 버튼 */}
                <div className="flex gap-2 mt-1">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        저장
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 border rounded-lg transition-colors"
                    >
                        초기화
                    </button>
                </div>
            </div>

            {/* 메시지 */}
            {message && (
                <p className={`mt-3 text-sm ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                    {message}
                </p>
            )}

            {/* 저장 결과 */}
            {result && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border text-sm">
                    <p className="font-medium text-gray-700">{result.content}</p>
                    <p className="text-gray-500 mt-0.5">{result.translate}</p>
                    {result.sentenceWords.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {result.sentenceWords.map(sw => (
                                <span key={sw.id} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    {sw.word.word}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}