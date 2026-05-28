import { useForm } from 'react-hook-form'

type PersonalFormData = {
  name: string
  description: string
  systemPrompt: string
}

type Props = {
  onSubmit: (data: PersonalFormData) => void
}

export default function PersonalForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PersonalFormData>()

  function handleFormSubmit(data: PersonalFormData) {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-100">新增 Persona</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5">設定 AI 的角色與行為準則</p>
        </div>
      </div>

      {/* 名稱 */}
      <div className="flex items-start gap-6 py-4 border-b border-dashed border-slate-300 dark:border-zinc-800">
        <div className="w-32 flex-shrink-0">
          <label className="text-sm text-slate-600 dark:text-zinc-300">名稱</label>
        </div>
        <div className="flex-1">
          <input
            {...register('name', { required: '請填寫名稱', minLength: { value: 2, message: '名稱至少要兩個字' } })}
            placeholder="例：技術顧問"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
          {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5">{errors.name.message}</p>}
        </div>
      </div>

      {/* 描述 */}
      <div className="flex items-start gap-6 py-4 border-b border-dashed border-slate-300 dark:border-zinc-800">
        <div className="w-32 flex-shrink-0">
          <label className="text-sm text-slate-600 dark:text-zinc-300">描述</label>
          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5">顯示於選擇列表</p>
        </div>
        <div className="flex-1">
          <input
            {...register('description', { required: '請填寫描述', minLength: { value: 5, message: '描述至少要五個字' } })}
            placeholder="例：專精程式架構與技術選型"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
          {errors.description && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5">{errors.description.message}</p>}
        </div>
      </div>

      {/* System Prompt */}
      <div className="flex items-start gap-6 py-4 border-b border-dashed border-slate-300 dark:border-zinc-800">
        <div className="w-32 flex-shrink-0">
          <label className="text-sm text-slate-600 dark:text-zinc-300">系統提示詞</label>
          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5">定義 AI 的行為準則</p>
        </div>
        <div className="flex-1">
          <textarea
            {...register('systemPrompt', { required: '請輸入系統提示詞', minLength: { value: 10, message: '至少 10 個字' } })}
            placeholder="例：你是一位資深軟體架構師，擅長..."
            rows={4}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
          />
          {errors.systemPrompt && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5">{errors.systemPrompt.message}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-3 py-1.5 text-sm text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          清除
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:text-violet-400 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          {isSubmitting ? '建立中...' : '新增 Persona'}
        </button>
      </div>
    </form>
  )
}
