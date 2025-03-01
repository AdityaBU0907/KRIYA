"use client"

import type React from "react"

// Simplified version of the use-toast hook
import { useState, useEffect } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastActionType = {
  toast: (props: Omit<ToastProps, "id">) => void
  dismiss: (id: string) => void
  toasts: ToastProps[]
}

let count = 0

export function useToast(): ToastActionType {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ ...props }: Omit<ToastProps, "id">) => {
    const id = String(count++)
    setToasts((prev) => [...prev, { id, ...props }])

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        setToasts((prev) => prev.slice(1))
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [toasts])

  return {
    toast,
    dismiss,
    toasts,
  }
}

