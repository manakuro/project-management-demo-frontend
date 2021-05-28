import React, { memo } from 'react'
import { FileUploader, FileUploaderParams, Portal } from 'src/components/atoms'
import {
  MenuItem,
  MenuList as OrganismsMenuList,
  MenuGroup,
} from 'src/components/organisms'
import { useClickOutside, useMenuStyle } from 'src/hooks'

type Props = {
  onUpload?: (files: FileUploaderParams) => void
  onClose?: () => void
}

export const MenuList: React.FC<Props> = memo((props) => {
  const itemStyle = useMenuStyle().item
  const { ref } = useClickOutside(() => {
    props.onClose?.()
  })

  return (
    <Portal>
      <OrganismsMenuList ref={ref}>
        <MenuGroup title="Attach a File">
          <FileUploader
            {...itemStyle}
            id="attach-file-from-your-computer"
            onUpload={props.onUpload}
            onUploaded={props.onClose}
          >
            Your computer
          </FileUploader>
          <MenuItem>Dropbox</MenuItem>
          <MenuItem>Google Drive</MenuItem>
          <MenuItem>Box</MenuItem>
          <MenuItem>OneDrive/SharePoint</MenuItem>
        </MenuGroup>
      </OrganismsMenuList>
    </Portal>
  )
})
