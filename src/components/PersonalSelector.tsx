import { useState } from 'react'
import PersonalCard from './PersonalCard'

const personas = [
  { id: 1, name: '技術顧問', description: '專精程式架構與技術選型' },
  { id: 2, name: '文案助手', description: '協助撰寫行銷文案與內容' },
  { id: 3, name: '學習夥伴', description: '陪你學習、出題、解釋概念' },
]

function PersonalSelector() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Personas</p>
        {selectedId && (
          <span className="text-xs text-violet-500 dark:text-violet-400 font-medium">
            {personas.find(p => p.id === selectedId)?.name} 已選擇
          </span>
        )}
      </div>
      {personas.map(persona => (
        <PersonalCard
          key={persona.id}
          name={persona.name}
          description={persona.description}
          isSelected={selectedId === persona.id}
          onSelect={() => setSelectedId(persona.id)}
        />
      ))}
    </div>
  )
}

export default PersonalSelector
