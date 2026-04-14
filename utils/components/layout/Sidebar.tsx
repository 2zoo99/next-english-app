// utils/components/layout/SideBar.tsx
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/test', label: 'Test' },
    // 다른 페이지들도 여기에 추가 가능
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
// 인터페이스는 SideBar 컴포넌트가 받는 props의 타입을 정의함. isOpen은 사이드바가 열려있는지 여부를 나타내는 boolean, onClose는 사이드바를 닫는 함수입니다.

export default function SideBar({ isOpen, onClose }: Props) {
    const pathname = usePathname();

    return (
        <>
            {/* 오버레이 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-10"
                    onClick={onClose}
                />
            )}

            {/* 사이드바 */}
            <nav
                className={`fixed top-0 left-0 h-full w-56 bg-white border-r z-20 transform transition-transform duration-250 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 border-b text-sm text-grey-400 font-medium">메뉴</div>
                <ul className="p-2 space-y-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                onClick={onClose}
                                className={`block px-3 py-2 rounded-md text-sm transition-colors ${pathname === item.path ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                            >{item.label}</Link>
                        </li>))}
                </ul>
            </nav>
        </>
    )
}
