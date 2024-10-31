"use client";

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const RouterContext = createContext<AppRouterInstance | null>(null);

export function RouterProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export function useRouterContext() {
    return useContext(RouterContext);
}