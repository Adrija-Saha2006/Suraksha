import type { PropsWithChildren } from 'react'

interface CardProps {
  className?: string
}

export function Card({ className = '', children }: PropsWithChildren<CardProps>) {
  return (
    <div className={`border border-border bg-surface px-[24px] py-[20px] ${className}`}>
      {children}
    </div>
  )
}
