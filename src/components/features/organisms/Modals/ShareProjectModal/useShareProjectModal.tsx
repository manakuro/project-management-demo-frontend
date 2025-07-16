import { useCallback } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { type Index, MEMBERS_INDEX, SHARE_INDEX } from './types'
import { useShareProjectModalInvitedTeammates } from './useShareProjectModalInvitedTeammates'

const key = (str: string) =>
  `src/components/organisms/Modals/ShareProjectModal/useShareProjectModal/${str}`

const openState = atom({
  key: key('openState'),
  default: false,
})

const projectIdState = atom<string>({
  key: key('projectIdState'),
  default: '',
})

const tabIndexState = atom<Index>({
  key: key('tabIndexState'),
  default: 0,
})

export const useShareProjectModal = () => {
  const { resetInvitedTeammates } = useShareProjectModalInvitedTeammates()
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [projectId, setProjectId] = useRecoilState(projectIdState)
  const resetProjectId = useResetRecoilState(projectIdState)

  const [tabIndex, setTabIndex] = useRecoilState(tabIndexState)
  const resetTabIndex = useResetRecoilState(tabIndexState)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetProjectId()
    resetTabIndex()
    resetInvitedTeammates()
  }, [setIsOpen, resetProjectId, resetTabIndex, resetInvitedTeammates])

  const setShareTab = useCallback(() => {
    setTabIndex(SHARE_INDEX)
  }, [setTabIndex])

  const setMembersTab = useCallback(() => {
    setTabIndex(MEMBERS_INDEX)
  }, [setTabIndex])

  return {
    isOpen,
    onOpen,
    onClose,
    projectId,
    setProjectId,
    setShareTab,
    setMembersTab,
    tabIndex,
  }
}
