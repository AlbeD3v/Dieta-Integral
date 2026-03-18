import React from 'react'

type Props = {
  children: string
  className?: string
}

export default function SanitizedMarkdown({ children, className }: Props) {
  return (
    <div className={className}>{children}</div>
  )
}
