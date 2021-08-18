import { useCallback, useEffect, useState } from 'react'
import { useTabStatusForMyTasksFromResponse } from 'src/store/entities/tabStatusForMyTasks'
import { TabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks/type'

type Props = {
  lazy?: boolean
}

export const useTabStatusForMyTasksQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setTabStatus } = useTabStatusForMyTasksFromResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setLoading(true)
      const res = await fetch()
      setTabStatus(res)
      setLoading(false)
    })()
  }, [props?.lazy, setTabStatus, setLoading])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetch()
      setTabStatus(res)
      setLoading(false)
    })()
  }, [setTabStatus, setLoading])

  return {
    refetch,
    loading,
  }
}

const fetch = async (): Promise<TabStatusForMyTasks> => {
  return new Promise<TabStatusForMyTasks>((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        teammateId: '1',
        tabStatus: 4,
      })
    }, 500)
  })
}
