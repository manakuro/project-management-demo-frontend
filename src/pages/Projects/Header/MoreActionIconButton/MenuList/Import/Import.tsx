import React, { memo } from 'react'
import { Flex, Icon, Text } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { PopoverImportActions } from './PopoverImportActions'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  isOpen: boolean
  projectId: string
}

export const Import: React.FC<Props> = memo((props) => {
  const { onMouseEnter, isOpen, onClose } = props

  return (
    <MenuItem onMouseEnter={onMouseEnter}>
      <PopoverImportActions isOpen={isOpen} placement="right" onClose={onClose}>
        <Flex flex={1}>
          <Text fontSize="sm" flex={1}>
            Import
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverImportActions>
    </MenuItem>
  )
})
Import.displayName = 'Import'
