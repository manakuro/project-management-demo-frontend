import React, { memo, useCallback } from 'react'
import { Portal } from 'src/components/ui/atoms'
import {
  MenuList as AtomsMenuList,
  MenuDivider,
} from 'src/components/ui/organisms/Menu'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useDisclosure } from 'src/shared/chakra'
import { AddCoverImage } from './AddCoverImage'
import { CopyTask } from './CopyTask'
import { DeleteTask } from './DeleteTask'
import { DuplicateTask } from './DuplicateTask'
import { EditTaskName } from './EditTaskName'
import { MarkComplete } from './MarkComplete'
import { OpenInNewTab } from './OpenInNewTab'
import { ViewDetails } from './ViewDetails'

type Props = {
  onCloseMenu: () => void
  taskId: string
}
export const MenuList: React.FC<Props> = memo((props) => {
  const { onCloseMenu } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref } = useClickOutside(() => {
    handleCloseAll()
  })

  const handleCloseAll = useCallback(() => {
    onClose()
    onCloseMenu()
  }, [onClose, onCloseMenu])

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  )

  return (
    <Portal>
      <AtomsMenuList ref={ref} zIndex={1} onClick={stopPropagation}>
        <EditTaskName onMouseEnter={onClose} onCloseMenu={onCloseMenu} />
        <AddCoverImage
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={handleCloseAll}
        />
        <MenuDivider />
        <MarkComplete
          taskId={props.taskId}
          onMouseEnter={onClose}
          onCloseMenu={onCloseMenu}
        />
        <ViewDetails
          taskId={props.taskId}
          onMouseEnter={onClose}
          onCloseMenu={onCloseMenu}
        />
        <OpenInNewTab
          taskId={props.taskId}
          onMouseEnter={onClose}
          onCloseMenu={onCloseMenu}
        />
        <MenuDivider />
        <DuplicateTask
          taskId={props.taskId}
          onMouseEnter={onClose}
          onCloseMenu={onCloseMenu}
        />
        <CopyTask
          taskId={props.taskId}
          onMouseEnter={onClose}
          onCloseMenu={onCloseMenu}
        />
        <MenuDivider />
        <DeleteTask taskId={props.taskId} onMouseEnter={onClose} />
      </AtomsMenuList>
    </Portal>
  )
})

MenuList.displayName = 'MenuList'
