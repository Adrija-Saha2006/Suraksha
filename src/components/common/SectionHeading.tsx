import type { PropsWithChildren } from 'react'

export function SectionHeading({ children }: PropsWithChildren) {
  return (
    <div className="mb-[20px] flex flex-col gap-[8px]">
      <h2 className="text-subheading font-normal tracking-[-0.03em]">{children}</h2>
      <span className="h-[3px] w-[36px] bg-brand-green" />
    </div>
  )
}
