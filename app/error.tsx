// app/error.tsx

'use client'
// error.tsx는 Next.js 규칙상 클라이언트 컴포넌트로 넣어야 함. 서버에서 에러가 나서 클라이언트가 화면으로 대신 보여줘야 하기 때문.

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">문제가 발생했어요</h1>
                <p className="text-gray-500 mb-6">잠시 후 다시 시도해주세요.</p>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                >
                    다시 시도
                </button>
            </div>
        </div>
    )
}