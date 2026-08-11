// utils/context/RefreshContext.tsx

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type RefreshContextType = {
    refreshKey: number; // 상태를 변경할 때마다 = 새로고침 할때마다 증가하는 키
    triggerRefresh: () => void; // 상태를 변경하여 새로고침을 트리거하는 함수
}

const RefreshContext = createContext<RefreshContextType | null>(null);

export function RefreshProvider({ children }: { children: ReactNode }) {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <RefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};
// 다른 컴포넌트에서 쉽게 꺼내 쓰기 위한 커스텀 훅
export function useRefresh() {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error('useRefresh must be used within a RefreshProvider');
    }
    return context;
}