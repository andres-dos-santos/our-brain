'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { BoxHeader } from '@/components/box-header'
import { Records } from '@/components/records'

import { supabase } from '@/data/supabase'

const Schema = z.object({
  thinking: z.string(),
  emotion: z.string(),
  behavior: z.string(),
})

type Input = z.infer<typeof Schema>

async function insertRecord(input: Input) {
  await supabase
    .from('auto-records')
    .insert({
      thinking: input.thinking,
      behavior: input.behavior,
      emotion: input.emotion,
    })
    .select('*')
}

export const revalidate = 30

export default function Home(props: { params: { id: string } }) {
  const { register, handleSubmit, reset } = useForm<Input>({
    resolver: zodResolver(Schema),
  })

  function onSubmit(input: Input) {
    insertRecord(input)

    reset()
  }

  const editable = props.params.id !== 'empty'

  async function getById() {
    const { data } = await supabase
      .from('auto-records')
      .select('behavior, emotion, thinking')
      .eq('id', props.params.id)

    const input = data ? data[0] : null

    reset({
      behavior: input?.behavior,
      emotion: input?.emotion,
      thinking: input?.thinking,
    })
  }

  useEffect(() => {
    if (props.params.id !== 'empty') {
      getById()
    }
  }, [reset, props.params.id])

  return (
    <form
      className="grid grid-cols-3 min-h-screen relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-10 flex flex-col">
        <BoxHeader.Root>
          <BoxHeader.Title>PENSAMENTOS</BoxHeader.Title>

          <BoxHeader.Questions>
            <BoxHeader.Question>
              O que você está pensando sobre uma situação específica?
            </BoxHeader.Question>
            <BoxHeader.Question>
              Quais são seus pensamentos automáticos?
            </BoxHeader.Question>
          </BoxHeader.Questions>
        </BoxHeader.Root>

        <textarea
          disabled={editable}
          {...register('thinking')}
          className="bg-zinc-900 text-sm outline-none flex flex-1 resize-none leading-7"
        />
      </div>

      <div className="p-10 flex flex-col border-x border-zinc-800">
        <BoxHeader.Root>
          <BoxHeader.Title>EMOÇÕES</BoxHeader.Title>

          <BoxHeader.Questions>
            <BoxHeader.Question>
              Como você está se sentindo em relação a isso?
            </BoxHeader.Question>
            <BoxHeader.Question>
              Qual é a intensidade da sua emoção?
            </BoxHeader.Question>
          </BoxHeader.Questions>
        </BoxHeader.Root>

        <textarea
          disabled={editable}
          {...register('emotion')}
          className="bg-zinc-900 text-sm outline-none flex flex-1 resize-none leading-7"
        />
      </div>

      <div className="p-10 flex flex-col">
        <BoxHeader.Root>
          <BoxHeader.Title>COMPORTAMENTO</BoxHeader.Title>

          <BoxHeader.Questions>
            <BoxHeader.Question>
              O que você está fazendo em uma situação específica?
            </BoxHeader.Question>
            <BoxHeader.Question>
              Como você está reagindo à situação?
            </BoxHeader.Question>
          </BoxHeader.Questions>
        </BoxHeader.Root>

        <textarea
          disabled={editable}
          {...register('behavior')}
          className="bg-zinc-900 text-sm outline-none flex flex-1 resize-none leading-7"
        />
      </div>

      <button
        type="submit"
        className="transition-all duration-300 hover:scale-105 h-14 w-14 flex items-center justify-center bg-white absolute bottom-10 right-10 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M232,127.89a16,16,0,0,1-8.18,14L55.91,237.9A16.14,16.14,0,0,1,48,240a16,16,0,0,1-15.05-21.34L60.3,138.71A4,4,0,0,1,64.09,136H136a8,8,0,0,0,8-8.53,8.19,8.19,0,0,0-8.26-7.47H64.16a4,4,0,0,1-3.79-2.7l-27.44-80A16,16,0,0,1,55.85,18.07l168,95.89A16,16,0,0,1,232,127.89Z"></path>
        </svg>
      </button>

      <Records />
    </form>
  )
}
