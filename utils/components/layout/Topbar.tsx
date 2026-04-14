'use client'

interface Props {
    onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: Props) {
    return (
        <header className="h-14 border-b bg-white flex items-center px-4 gap-4">
            <button
                onClick={onMenuClick}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="메뉴 열기"
            >
                {/* 줄 세개 아이콘 */}
                <div className="w-5 flex flex-col gap-1.5">
                    <span className="block h-0.5 bg-gray-700 rounded" />
                    <span className="block h-0.5 bg-gray-700 rounded" />
                    <span className="block h-0.5 bg-gray-700 rounded" />
                </div>
            </button>
            <span className="font-medium">MyApp</span>
        </header>
    )
}