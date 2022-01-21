import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useMyTasksTabStatusResponse } from 'src/store/entities/myTasksTabStatus'
import { MyTasksTabStatus } from 'src/store/entities/myTasksTabStatus/type'

const key = (str: string) =>
  `src/hooks/queries/useTabStatusForMyTasksQuery/${str}`

export const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: true,
})

type Props = {
  lazy?: boolean
}

export const useTabStatusForMyTasksQuery = (props?: Props) => {
  const [loading, setLoading] = useRecoilState(loadingState)
  const { setMyTaskTabStatus } = useMyTasksTabStatusResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setLoading(true)
      const res = await fetch()
      setMyTaskTabStatus(res)
      setLoading(false)
    })()
  }, [props?.lazy, setMyTaskTabStatus, setLoading])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetch()
      setMyTaskTabStatus(res)
      setLoading(false)
    })()
  }, [setMyTaskTabStatus, setLoading])

  return {
    refetch,
    loading,
  }
}

const fetch = async (): Promise<MyTasksTabStatus> => {
  return new Promise<MyTasksTabStatus>((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        teammateId: '1',
        tabStatus: 1,
      })
    }, 500)
  })
}
