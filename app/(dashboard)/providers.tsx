'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from '@/components/context/modal-context';
import { RouterProvider } from '@/components/context/router-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouterProvider>
      <TooltipProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </TooltipProvider>
    </RouterProvider >
  );
}
