// utils/components/LineNumberedText.tsx

interface Props {
    text: string;
}

export function LineNumberedText({ text }: Props) {
    const lines = text.split('\n');

    return (
        <div className="flex bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden text-sm">
            <div className="select-none text-right pr-2 pl-3 py-2 text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-900 shrink-0" style={{ lineHeight: '1.5rem' }}>
                {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <div className="flex-1 px-3 py-2 text-gray-800 dark:text-gray-200" style={{ lineHeight: '1.5rem' }}>
                {lines.map((line, i) => (
                    <div key={i}>{line || '\u00A0'}</div>
                ))}
            </div>
        </div>
    )
}