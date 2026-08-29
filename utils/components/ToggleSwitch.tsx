'use client'

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    leftLabel: string;
    rightLabel: string;
}

export default function ToggleSwitch({ checked, onChange, leftLabel, rightLabel }: Props) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <span className={!checked ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                {leftLabel}
            </span>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
            <span className={checked ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                {rightLabel}
            </span>
        </div>
    )
}