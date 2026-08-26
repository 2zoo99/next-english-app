// app/loading.tsx
// app 폴더 최상위에 loading.tsx 파일을 두면 Next.js에서는 모든 하위 페이지에서 데이터를 기다리는 동안 이 화면은 띄운다.

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <h2 className="text-center text-gray-700 text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-gray-600">잠시만 기다려주세요. 데이터를 불러오는 중입니다.</p>
        </div>
    )
}