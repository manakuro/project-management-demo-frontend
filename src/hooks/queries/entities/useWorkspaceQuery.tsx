import { useCallback, useEffect, useState } from 'react'
import { useMountedRef } from 'src/hooks'
import { useWorkspace, Workspace } from 'src/store/entities/workspace'

type Props = {
  lazy?: boolean
}

export const useWorkspaceQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setWorkspace } = useWorkspace()
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return
      setLoading(true)
      const res = await fetchWorkspace()
      setWorkspace(res)
      setLoading(false)
    })()
  }, [props?.lazy, setWorkspace])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetchWorkspace()
      if (mountedRef.current) {
        setWorkspace(res)
      }
    })()
  }, [mountedRef, setWorkspace])

  return {
    refetch,
    loading,
  }
}

const fetchWorkspace = (): Promise<Workspace> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'My Workspace',
        description: 'My Workspace description',
        createdBy: '1',
        createdAt: '',
        updatedAt: '',
      })
    }, 1000)
  })
}
