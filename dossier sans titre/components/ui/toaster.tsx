"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import SubtractIcon from "@/public/Subtract.svg"
import SubtractIcon2 from "@/public/Subtract2.svg"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title &&
              <div className="flex justify-start items-center gap-x-2 w-full"> 
                { props.variant === 'destructive' ?
                  <SubtractIcon className="w-7" />
                  :
                  <SubtractIcon2 className="w-7" />
                }
                <ToastTitle>{title}</ToastTitle>
              </div>
              }
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
