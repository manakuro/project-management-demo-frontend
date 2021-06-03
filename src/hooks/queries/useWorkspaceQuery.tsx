import { useCallback, useEffect } from 'react'
import { useWorkspace, Workspace } from 'src/store/entities/workspace'

type Props = {
  lazy?: boolean
}

export const useWorkspaceQuery = (props?: Props) => {
  const { setWorkspace } = useWorkspace()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchWorkspace()
      setWorkspace(res)
    })()
  }, [props?.lazy, setWorkspace])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchWorkspace()
      setWorkspace(res)
    })()
  }, [setWorkspace])

  return {
    refetch,
  }
}

const fetchWorkspace = (): Promise<Workspace> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'My Workspace',
        description: 'My Workspace description',
      })
    }, 1000)
  })
}
