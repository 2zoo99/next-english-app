// utils/components/LineNumberedTextarea.tsx

'use client'

import { useRef, useEffect, useState } from 'react'

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
}

export function LineNumberedTextarea({ value, onChange, placeholder, className }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(1);

    // 내용에 맞춰 높이 자동 조절 + 줄 수 계산
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;

        const lines = value.split('\n').length;
        setLineCount(lines);
    }, [value]);

    // textarea 스크롤과 줄 번호 스크롤을 동기화
    function handleScroll() {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }

    return (
        <div className={`flex bg-background border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className ?? ''}`}>
            <div
                ref={lineNumbersRef}
                className="select-none text-right pr-2 pl-3 py-2 text-sm text-gray-400 dark:text-gray-600 dark:bg-gray-900 overflow-hidden shrink-0"
                style={{ lineHeight: '1.5rem' }}
            >
                {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onScroll={handleScroll}
                placeholder={placeholder}
                rows={1}
                className="flex-1 px-3 py-2 bg-transparent text-sm resize-none overflow-hidden focus:outline-none"
                style={{ lineHeight: '1.5rem' }}
            />
        </div>
    )
}