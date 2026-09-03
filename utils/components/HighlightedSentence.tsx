type HighlightRange = {
    startIndex: number;
    endIndex: number;
    label: string;
}

interface Props {
    content: string;
    ranges: HighlightRange[];
}

export function HighlightedSentence({ content, ranges }: Props) {
    if (ranges.length === 0) {
        return <p className="dark:text-gray-300">{content}</p>;
    }

    const sorted = [...ranges].sort((a, b) => a.startIndex - b.startIndex);
    const segments: { text: string; highlighted: boolean; label?: string }[] = [];
    let cursor = 0;

    for (const range of sorted) {
        if (range.startIndex > cursor) {
            segments.push({ text: content.slice(cursor, range.startIndex), highlighted: false });
        }
        segments.push({
            text: content.slice(range.startIndex, range.endIndex),
            highlighted: true,
            label: range.label,
        });
        cursor = Math.max(cursor, range.endIndex);
    }
    if (cursor < content.length) {
        segments.push({ text: content.slice(cursor), highlighted: false });
    }

    return (
        <p className="dark:text-gray-300">
            {segments.map((seg, i) =>
                seg.highlighted ? (
                    <span
                        key={i}
                        title={seg.label}
                        className="bg-yellow-200/40 dark:bg-yellow-500/20 rounded px-0.5"
                    >
                        {seg.text}
                    </span>
                ) : (
                    <span key={i}>{seg.text}</span>
                )
            )}
        </p>
    );
}