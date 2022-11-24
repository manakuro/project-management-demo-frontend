import React, { memo } from 'react'
import { FileUploaderParams, Flex } from 'src/components/atoms'
import { Tooltip, TooltipProps } from 'src/components/molecules'
import { Menu } from 'src/components/organisms/Menu'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = {
  label: string
  tooltip?: Omit<TooltipProps, 'children'>
  onUpload?: (files: FileUploaderParams) => void
}

export const AttachmentMenu: React.FC<Props> = memo((props) => {
  const menuDisclosure = useDisclosure()

  return (
    <Menu isLazy isOpen={menuDisclosure.isOpen} autoSelect={false}>
      <Tooltip
        hasArrow
        label={props.label}
        aria-label="Attachment button"
        {...props.tooltip}
        withIcon
      >
        <Flex onClick={menuDisclosure.onOpen}>{props.children}</Flex>
      </Tooltip>
      {menuDisclosure.isOpen && (
        <MenuList onUpload={props.onUpload} onClose={menuDisclosure.onClose} />
      )}
    </Menu>
  )
})
AttachmentMenu.displayName = 'AttachmentMenu'
