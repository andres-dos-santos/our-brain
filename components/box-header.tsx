import { ComponentProps } from 'react'

function Root(props: ComponentProps<'header'>) {
  return (
    <header className="flex flex-col gap-y-5 border-b border-b-zinc-800 w-full pb-5 mb-5">
      {props.children}
    </header>
  )
}

function Title(props: ComponentProps<'strong'>) {
  return <strong className="text-[13px] font-bold">{props.children}</strong>
}

function Questions(props: ComponentProps<'div'>) {
  return <div className="h-12">{props.children}</div>
}

function Question(props: ComponentProps<'span'>) {
  return (
    <span className="text-xs font-medium mb-2 text-zinc-400 block">
      {props.children}
    </span>
  )
}

export const BoxHeader = {
  Root,
  Title,
  Questions,
  Question,
}
