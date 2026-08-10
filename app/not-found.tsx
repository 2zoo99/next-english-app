// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                <p className="text-gray-500 mb-6">페이지를 찾을 수 없어요.</p>
                <Link
                    href="/"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
}