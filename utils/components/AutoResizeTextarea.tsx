// /utils/components/AutoResizeTextarea.tsx

'use client'

import { useRef, useEffect } from 'react'

export function AutoResizeTextarea({
    value,
    onChange,
    className,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={onChange}
            rows={1}
            className={`resize-none overflow-hidden ${className ?? ''}`}
            {...props}
        />
    );
}