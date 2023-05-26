import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTaskDetailProjectsInput } from 'src/components/organisms/TaskDetail/hooks'
import { Icon } from 'src/components/ui/atoms'

type Props = {
  onMouseEnter: () => void
  onClose: () => void
  taskId: string
}

export const AddToAnotherProject: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onClose } = props
  const inputDisclosure = useTaskDetailProjectsInput()

  const handleClick = useCallback(async () => {
    onClose()
    inputDisclosure.onOpen()
  }, [inputDisclosure, onClose])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="bookAdd" color="text.muted" />}
      command="Tab+P"
      onClick={handleClick}
    >
      Add to another project
    </MenuItem>
  )
})
AddToAnotherProject.displayName = 'AddToAnotherProject'
