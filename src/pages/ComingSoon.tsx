interface ComingSoonProps {
  title: string
  description: string
  eyebrow?: string
}

export function ComingSoon({ title, description, eyebrow = 'Coming soon' }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center gap-[10px] border border-border bg-surface px-[30px] py-[40px]">
      <span className="text-[15px] leading-[1.2] text-muted">{eyebrow}</span>
      <h1 className="text-heading font-normal tracking-[-0.03em]">{title}</h1>
      <p className="max-w-[520px] text-[18px] leading-[1.1] text-muted">{description}</p>
    </div>
  )
}
