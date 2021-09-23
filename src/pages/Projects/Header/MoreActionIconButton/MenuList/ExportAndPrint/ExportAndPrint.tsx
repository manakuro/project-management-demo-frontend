import React, { memo } from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { PopoverExportAndPrintActions } from './PopoverExportAndPrintActions'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  isOpen: boolean
  projectId: string
}

export const ExportAndPrint: React.FC<Props> = memo((props) => {
  const { onMouseEnter, isOpen, onClose } = props

  return (
    <MenuItem onMouseEnter={onMouseEnter}>
      <PopoverExportAndPrintActions
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <Flex flex={1}>
          <Text fontSize="sm" flex={1}>
            Export/Print
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverExportAndPrintActions>
    </MenuItem>
  )
})
ExportAndPrint.displayName = 'ExportAndPrint'
