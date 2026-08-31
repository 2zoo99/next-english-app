'use client'

import { forwardRef, useRef, useEffect } from 'react'

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    function AutoResizeTextarea({ value, onChange, className, ...props }, forwardedRef) {
        const innerRef = useRef<HTMLTextAreaElement>(null);

        useEffect(() => {
            const el = innerRef.current;
            if (!el) return;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        }, [value]);

        return (
            <textarea
                ref={(node) => {
                    innerRef.current = node;
                    if (typeof forwardedRef === 'function') forwardedRef(node);
                    else if (forwardedRef) forwardedRef.current = node;
                }}
                value={value}
                onChange={onChange}
                rows={1}
                className={`resize-none overflow-hidden ${className ?? ''}`}
                {...props}
            />
        );
    }
);