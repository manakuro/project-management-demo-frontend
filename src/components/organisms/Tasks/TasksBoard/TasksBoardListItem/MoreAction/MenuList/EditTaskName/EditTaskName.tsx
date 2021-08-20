import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTasksBoardListItemInputContext } from '../../../Provider'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
}
export const EditTaskName: React.FC<Props> = memo((props) => {
  const { onInputSelect } = useTasksBoardListItemInputContext()
  const { onMouseEnter, onCloseMenu } = props

  const handleEditTaskName = useCallback(() => {
    onInputSelect()
    onCloseMenu()
  }, [onCloseMenu, onInputSelect])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="editAlt" color="text.muted" />}
      onClick={handleEditTaskName}
    >
      Edit task name
    </MenuItem>
  )
})

EditTaskName.displayName = 'EditTaskName'
