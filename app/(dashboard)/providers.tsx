'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from '@/components/context/modal-context';
import { RouterProvider } from '@/components/context/router-context';
import { TransitionProvider } from '@/components/context/transition-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouterProvider>
      <TransitionProvider>
        <ModalProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ModalProvider>
      </TransitionProvider>
    </RouterProvider >
  );
}
