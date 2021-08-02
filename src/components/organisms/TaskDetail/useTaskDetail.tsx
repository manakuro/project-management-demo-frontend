import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useTaskDetailQuery } from 'src/hooks/queries/useTaskDetailQuery'

const key = (str: string) =>
  `src/components/organisms/TaskDetail/useTaskDetail/${str}`

const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: false,
})

const idState = atom<string>({
  key: key('idState'),
  default: '',
})

const scrollIdState = atom<string>({
  key: key('scrollIdState'),
  default: '',
})

export const useTaskDetail = () => {
  const [id, setId] = useRecoilState(idState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [scrollId, setScrollId] = useRecoilState(scrollIdState)
  const { refetch } = useTaskDetailQuery({ lazy: true })
  const resetScrollId = useResetRecoilState(scrollIdState)
  const resetId = useResetRecoilState(idState)

  return {
    loading,
    taskId: id,
    refetch,
    scrollId,
    setScrollId,
    setId,
    setLoading,
    resetScrollId,
    resetId,
  }
}
