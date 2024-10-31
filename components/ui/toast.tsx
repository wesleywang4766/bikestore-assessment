import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from "@/lib/utils"
import { Button } from './button';
import { XIcon } from "lucide-react";

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = ToastPrimitive.Viewport;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-50 flex items-center justify-between p-4 bg-gray-800 text-white rounded shadow-lg",
      className
    )}
    {...props}
  >
    <ToastPrimitive.Title className="font-bold">
      {props.title}
    </ToastPrimitive.Title>
    <ToastPrimitive.Description className="ml-4">
      {props.children}
    </ToastPrimitive.Description>
    <ToastPrimitive.Close className="ml-4">
      <Button size="icon" className="text-white rounded-full1 bg-primary hover:bg-primary/50 ">
        <XIcon />
      </Button>
    </ToastPrimitive.Close>
  </ToastPrimitive.Root>
));

Toast.displayName = 'Toast';

export { ToastProvider, ToastViewport, Toast };