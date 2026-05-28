import { useState, useEffect } from 'react'

type FetchState<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useFetch<T>(fetchFn: () => Promise<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchFn()
      .then(result => {
        if (!cancelled) {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('載入資料時發生錯誤')
          setIsLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { data, isLoading, error }
}
