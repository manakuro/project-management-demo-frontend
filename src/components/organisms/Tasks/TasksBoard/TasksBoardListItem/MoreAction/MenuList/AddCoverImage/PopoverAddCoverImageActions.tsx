import React from 'react'
import { Box, FileUploader, FileUploaderParams } from 'src/components/atoms'
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuProps,
} from 'src/components/organisms'
import { useMenuStyle } from 'src/hooks'
import { chakra } from 'src/shared/chakra'

type Props = {
  onUpload?: (files: FileUploaderParams) => void
  onClose: () => void
} & MenuProps

export const PopoverAddCoverImageActions: React.FC<Props> = (props) => {
  const itemStyle = useMenuStyle().item

  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <FileUploader
          {...itemStyle}
          id="attach-file-from-your-computer"
          onUpload={props.onUpload}
          onUploaded={props.onClose}
        >
          Your computer
        </FileUploader>
        <MenuItem as={Box}>Dropbox</MenuItem>
        <MenuItem as={Box}>Google Drive</MenuItem>
        <MenuItem as={Box}>Box</MenuItem>
        <MenuItem as={Box}>OneDrive/SharePoint</MenuItem>
      </MenuList>
    </Menu>
  )
}

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
})
