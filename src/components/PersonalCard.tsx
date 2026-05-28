type PersonalCardProps = {
  name: string
  description: string
  isSelected: boolean
  onSelect: () => void
}

function PersonalCard({ name, description, isSelected, onSelect }: PersonalCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        pl-3 pr-3 py-2.5 mb-1 rounded-md border-l-2 cursor-pointer transition-all duration-150
        ${isSelected
          ? 'border-violet-500 bg-violet-500/10 text-slate-800 dark:text-zinc-100'
          : 'border-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-600 text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
      </div>
      <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5 truncate">{description}</p>
    </div>
  )
}

export default PersonalCard
