import { useEffect } from 'react'
import './App.css'
import ConversationSidebar from './components/ConversationSidebar'
import PersonalForm from './components/PersonalForm'
import PersonalSelector from './components/PersonalSelector'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100">
      <ConversationSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-zinc-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-slate-800 dark:text-zinc-100">Personas</h1>
            <p className="text-xs text-violet-500 dark:text-violet-400">管理 AI 角色設定</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-64 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-200 dark:bg-zinc-700 rounded" />
              <span className="text-xs text-slate-500 dark:text-zinc-500">搜尋...</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-3xl">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 mb-6">
            <PersonalSelector />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6">
            <PersonalForm onSubmit={(data) => console.log('新增 Persona:', data)} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
