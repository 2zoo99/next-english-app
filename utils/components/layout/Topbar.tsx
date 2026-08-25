'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from '@supabase/supabase-js'
import { createClient } from "@/utils/supabase/client";
import { useRefresh } from "@/utils/context/RefreshContext";

interface Props {
    onMenuClick: () => void;
    user: User | null;

}

export default function Topbar({ onMenuClick, user }: Props) {
    const { triggerRefresh } = useRefresh();
    const router = useRouter();
    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh(); // 서버 컴포넌트(WithNavLayout)가 로그아웃 상태를 다시 읽도록
    }
    return (
        <header className="bg-background">
            <div className="h-14 flex items-center px-4 gap-4 dark:bg-gray-800 shadow-md">
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

                <Link href="/" onClick={triggerRefresh} className="flex items-center gap-2 min-w-0 shrink truncate">
                    <span className="font-bold text-base sm:text-2xl truncate dark:text-gray-300">Youngjak Gym</span>
                    오늘도 영작 운동!
                </Link>
                <div className="flex-1" />
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-500 dark:text-gray-400 max-w-[160px] truncate">
                                {user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors whitespace-nowrap"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors whitespace-nowrap"
                            >
                                로그인
                            </Link>
                            <Link
                                href="/signup"
                                className="px-3 py-1.5 text-sm text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-md transition-colors whitespace-nowrap"
                            >
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="sm:hidden flex justify-end gap-2 px-4 py-2">
                {user ? (
                    <>
                        <span className="text-xs text-gray-500 dark:text-gray-400 self-center max-w-[100px] truncate">
                            {user.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors whitespace-nowrap"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors whitespace-nowrap"
                        >
                            로그인
                        </Link>
                        <Link
                            href="/signup"
                            className="px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-md transition-colors whitespace-nowrap"
                        >
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}