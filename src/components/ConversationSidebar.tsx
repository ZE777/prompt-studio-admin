import { useEffect } from 'react'
import { useConversationStore } from '../store/conversationStore'
import { useTheme } from '../context/ThemeContext'

// 暫時用 fake data，之後換成真實 API
const fakeConversations = [
  { id: 'c1', title: '討論 React 架構', createdAt: '2026-05-20', updatedAt: '2026-05-26' },
  { id: 'c2', title: '技術選型問題', createdAt: '2026-05-22', updatedAt: '2026-05-27' },
  { id: 'c3', title: 'Zustand vs Context', createdAt: '2026-05-27', updatedAt: '2026-05-27' },
]

export default function ConversationSidebar() {
  const { theme, toggleTheme } = useTheme()
  const conversations = useConversationStore((state) => state.conversations)
  const activeId = useConversationStore((state) => state.activeId)
  const setConversations = useConversationStore((state) => state.setConversations)
  const setActiveId = useConversationStore((state) => state.setActiveId)

  useEffect(() => {
    setConversations(fakeConversations)
  }, [])

  return (
    <aside className="w-56 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-slate-800 dark:bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white dark:bg-zinc-900" />
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-zinc-100">Prompt Studio</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="py-3 border-b border-slate-200 dark:border-zinc-800">
        {['Dashboard', 'Personas', 'Templates', 'Analytics'].map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-2.5 px-4 py-2 text-sm cursor-pointer transition-all ${
              i === 0
                ? 'border-l-2 border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300'
                : 'border-l-2 border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <div className={`w-4 h-4 rounded ${i === 0 ? 'bg-violet-500/40' : 'bg-slate-200 dark:bg-zinc-700/50'}`} />
            {item}
          </div>
        ))}
      </nav>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <p className="text-xs text-slate-500 dark:text-zinc-500 uppercase tracking-wider">對話記錄</p>
          <button
            className="text-xs text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            onClick={() => {
              const newConv = {
                id: `c${Date.now()}`,
                title: '新對話',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
              useConversationStore.getState().addConversation(newConv)
            }}
          >
            + 新增
          </button>
        </div>

        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setActiveId(conv.id)}
            className={`px-3 py-2 rounded-md cursor-pointer transition-all group border-l-2 ${
              activeId === conv.id
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-600'
            }`}
          >
            <p className={`text-sm truncate ${activeId === conv.id ? 'text-violet-600 dark:text-violet-200' : 'text-slate-600 dark:text-zinc-300 group-hover:text-slate-800 dark:group-hover:text-zinc-100'}`}>
              {conv.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5">{conv.updatedAt.slice(0, 10)}</p>
          </div>
        ))}
      </div>

      {/* User */}
      <div className="p-3 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-semibold text-white">
              U
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-700 dark:text-zinc-200 truncate">使用者</p>
            <p className="text-xs text-emerald-500 dark:text-emerald-400">● Online</p>
          </div>
          <button
            onClick={toggleTheme}
            className="text-xs text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer flex-shrink-0"
            title={theme === 'dark' ? '切換淺色' : '切換深色'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </aside>
  )
}
