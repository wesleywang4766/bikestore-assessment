'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from '@/providers/context/modal-context';
import { RouterProvider } from '@/providers/context/router-context';
import { TransitionProvider } from '@/providers/context/transition-context';

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
