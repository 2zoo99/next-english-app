//utils/components/SentenceForm.tsx

'use client'

import { useState, useRef } from 'react'
// useRef는 React에서 DOM 요소나 컴포넌트 인스턴스를 참조하기 위해 사용하는 훅입니다. 이 훅을 사용하면 특정 DOM 요소에 직접 접근하거나, 렌더링 사이클 동안 값이 유지되는 변수를 만들 수 있습니다. useRef를 사용하면 컴포넌트가 다시 렌더링될 때도 참조된 값이 유지되므로, 예를 들어 입력 필드에 포커스를 설정하거나, 이전 상태 값을 저장하는 등의 작업에 유용합니다.
import TagPicker from './TagPicker'
import { AutoResizeTextarea } from './AutoResizeTextarea'

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
type Tag = {
    id: number;
    name: string;
}
type SentenceTag = {
    id: number;
    tag: Tag;
}
type Sentence = {
    id: number;
    content: string;
    translate: string;
    sentenceWords: SentenceWord[];
    sentenceTags: SentenceTag[];
}

export default function SentenceForm() {
    const [content, setContent] = useState('');
    const [translate, setTranslate] = useState('');
    const [tags, setTags] = useState<string[]>([]); // 태그 입력 상태 추가
    const [result, setResult] = useState<Sentence | null>(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // 성공 여부를 나타내는 상태 추가
    const translateRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [submitting, setSubmitting] = useState(false);




    const handleSubmit = async () => {
        if (!content.trim() || submitting) return; // content가 비어있으면 제출하지 않음

        setSubmitting(true);

        const res = await fetch('./api/sentences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, translate, tags }),
        });

        if (res.ok) {
            const data = await res.json();
            setResult(data);
            setContent('');
            setTranslate('');
            setTags([]); // 태그 입력 초기화
            setMessage('문장이 저장되었습니다.');
            setIsSuccess(true); // 성공 상태로 설정
            contentRef.current?.focus(); // content input에 포커스 이동
        }
        else {
            const data = await res.json();
            setMessage(data.error || '문장 저장에 실패했습니다.');
            setIsSuccess(false); // 실패 상태로 설정
        }
        setSubmitting(false);
    }

    const handleReset = () => {
        setContent('');
        setTranslate('');
        setTags([]); // 태그 입력 초기화
        setResult(null);
        setMessage('');
        contentRef.current?.focus(); // content input에 포커스 이동
    }

    return (
        <div className="mx-auto mt-8 p-6 bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">문장 추가</h2>

            <div className="flex flex-col gap-3">
                {/* 문장 입력 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">문장</label>
                    <AutoResizeTextarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                translateRef.current?.focus();
                            }
                        }}
                        placeholder="영어 문장을 입력하세요"
                        className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"

                    />
                </div>

                {/* 번역 입력 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">번역</label>
                    <AutoResizeTextarea
                        value={translate}
                        onChange={(e) => setTranslate(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder="한국어 번역을 입력하세요 (선택)"
                        className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* 태그 입력 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">태그</label>
                    <TagPicker selectedTags={tags} onChange={setTags} />
                </div>

                {/* 버튼 */}
                <div className="flex gap-2 mt-1">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!content.trim() || submitting}
                        className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {submitting ? '저장 중 ...' : '저장되었습니다.'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
                    >
                        초기화
                    </button>
                </div>
            </div>

            {/* 메시지 */}
            {message && (
                <p className={`mt-3 text-sm ${isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {message}
                </p>
            )}

            {/* 저장 결과 */}
            {result && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                    <p className="font-medium text-gray-700 dark:text-gray-300">{result.content}</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">{result.translate}</p>
                    {result.sentenceWords.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {result.sentenceWords.map(sw => (
                                <span key={sw.id} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                                    {sw.word.word}
                                </span>
                            ))}
                        </div>
                    )}
                    <div>
                        {result.sentenceTags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                                {result.sentenceTags.map(st => (
                                    <span key={st.id} className="px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs">
                                        {st.tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}