import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { Flex, Icon, Text } from 'src/components/ui/atoms'
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
