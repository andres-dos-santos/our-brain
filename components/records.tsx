import { supabase } from '@/data/supabase'
import dayjs from 'dayjs'
import Link from 'next/link'

async function loadRecords() {
  const response = await supabase.from('auto-records').select('*')

  return response.data
    ? response.data.map((record) => ({
        id: record.id,
        created_at: dayjs(record.created_at).format('MMM DD[,]YYYY[ at ]HH:mm'),
      }))
    : []
}

export async function Records() {
  const data = await loadRecords()

  return (
    <aside className="p-10 hover:w-[33%] border-l border-zinc-800 opacity-0 hover:opacity-100 transition-[width|opacity] duration-500 h-screen w-[20px] fixed top-0 bottom-0 right-0 bg-zinc-800/50 backdrop-blur-xl">
      <strong className="text-[13px] font-bold">HISTÓRICO</strong>

      <ul className="mt-10">
        {data.map((item) => (
          <li
            key={item.id}
            className="hover:text-blue-500 cursor-pointer flex items-center justify-between"
          >
            <Link href={item.id}>
              <span className="text-sm font-medium">{item.created_at}</span>
            </Link>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#ffffff"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm29.66,109.66-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,157.66,133.66Z"></path>
            </svg>
          </li>
        ))}
      </ul>
    </aside>
  )
}
