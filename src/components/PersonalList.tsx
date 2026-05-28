import { useState, useEffect } from 'react'

type Persona = {
  id: number
  name: string
  description: string
}

function fakeApi(): Promise<Persona[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '技術顧問', description: '專精程式架構與技術選型' },
        { id: 2, name: '文案助手', description: '協助撰寫行銷文案與內容' },
        { id: 3, name: '學習夥伴', description: '陪你學習、出題、解釋概念' },
      ])
    }, 1000)
  })
}

export default function PersonalList() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fakeApi()
      .then(data => {
        setPersonas(data)
        setIsLoading(false)
      })
      .catch(() => {
        setError('載入資料時發生錯誤')
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400 p-4">
        <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
        載入中...
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-red-500 p-4">{error}</div>
  }

  return (
    <ul className="list-none m-0 p-0">
      {personas.map(p => (
        <li key={p.id} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          {p.name}
        </li>
      ))}
    </ul>
  )
}
