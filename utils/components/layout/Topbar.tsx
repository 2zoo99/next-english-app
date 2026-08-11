'use client'

import Link from "next/link";
import { useRefresh } from "@/utils/context/RefreshContext";

interface Props {
    onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: Props) {
    const { triggerRefresh } = useRefresh();
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
            <Link href="/" onClick={triggerRefresh} className="flex items-center gap-2">
                <span className="font-bold text-2xl">English-sentence study App for Korean</span>
            </Link>
            <div className="ml-auto flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-grey-600 hover:bg-gray-100 rounded-md transition-colors">
                    로그인
                </button>
                <button className="px-3 py-1.5 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors">
                    회원가입
                </button>
            </div>
        </header>
    )
}