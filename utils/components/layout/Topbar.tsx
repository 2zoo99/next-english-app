'use client'

import Link from "next/link";
import { useRefresh } from "@/utils/context/RefreshContext";

interface Props {
    onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: Props) {
    const { triggerRefresh } = useRefresh();
    return (
        <header className="bg-white dark:bg-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="h-14 flex items-center px-4 gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="메뉴 열기"
                    >
                        <div className="w-5 flex flex-col gap-1.5">
                            <span className="block h-0.5 bg-gray-700 dark:bg-gray-300 rounded" />
                            <span className="block h-0.5 bg-gray-700 dark:bg-gray-300 rounded" />
                            <span className="block h-0.5 bg-gray-700 dark:bg-gray-300 rounded" />
                        </div>
                    </button>

                    <Link href="/" onClick={triggerRefresh} className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="font-bold text-base sm:text-2xl truncate dark:text-gray-300">Practice Making Sentence</span>
                    </Link>

                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors whitespace-nowrap">
                            로그인
                        </button>
                        <button className="px-3 py-1.5 text-sm text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-md transition-colors whitespace-nowrap">
                            회원가입
                        </button>
                    </div>
                </div>
            </div>

            <div className="sm:hidden flex justify-end gap-2 px-4 py-2">
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors whitespace-nowrap">
                    로그인
                </button>
                <button className="px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-md transition-colors whitespace-nowrap">
                    회원가입
                </button>
            </div>
        </header>
    )
}