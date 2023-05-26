import React, { memo, PropsWithChildren } from 'react'
import { Menu } from 'src/components/organisms/Menu'
import { FileUploaderParams, Flex } from 'src/components/ui/atoms'
import { Tooltip, TooltipProps } from 'src/components/ui/molecules'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = PropsWithChildren<{
  label: string
  tooltip?: Omit<TooltipProps, 'children'>
  onUpload?: (files: FileUploaderParams) => void
}>

export const AttachmentMenu: React.FC<Props> = memo<Props>((props) => {
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
