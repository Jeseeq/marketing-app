import {useEffect, useState, useCallback} from 'react'

export const useLoadData = ({url}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setLoading(false)
    } catch (e) {
      console.error(e)
      setError(e)
      setLoading(false)
    }
  }, [url])

  const refetch = useCallback(async () => {
    setLoading(true)
    await fetchData()
  }, [fetchData])


  useEffect(() => {
    fetchData()
  }, [fetchData])


  return {
    refetch,
    loading,
    data,
    error,
  }
}
