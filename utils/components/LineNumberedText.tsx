// utils/components/LineNumberedText.tsx

interface Props {
    text: string;
}

export function LineNumberedText({ text }: Props) {
    const lines = text.split('\n');

    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden text-sm">
            {lines.map((line, i) => (
                <div key={i} className="flex">
                    <span className="select-none text-right pr-2 pl-3 py-1 text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-900 shrink-0 w-10">
                        {i + 1}
                    </span>
                    <span className="flex-1 px-3 py-1 text-gray-800 dark:text-gray-400 break-words">
                        {line || '\u00A0'}
                    </span>
                </div>
            ))}
        </div>
    )
}