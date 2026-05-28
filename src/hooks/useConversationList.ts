import { useFetch } from './useFetch'

export type Conversation = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

// 模擬 API，之後換成真實 axios call
function fetchConversations(userId: string): Promise<Conversation[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 'c1', title: '討論 React 架構', createdAt: '2026-05-20', updatedAt: '2026-05-26' },
        { id: 'c2', title: '技術選型問題', createdAt: '2026-05-22', updatedAt: '2026-05-27' },
      ])
    }, 800)
  })
}

// userId 之後從 authStore 取，現在先當參數傳入練習
export function useConversationList(userId: string) {
  return useFetch<Conversation[]>(() => fetchConversations(userId))
}
