import React, { memo, useCallback } from 'react'
import { Link, Portal } from 'src/components/atoms'
import { useThumbnailAttachmentContext } from 'src/components/molecules/ThumbnailAttachment/Provider'
import {
  Menu as OrganismsMenu,
  MenuProps,
  MenuItem,
  MenuList,
} from 'src/components/organisms'
import { useAttachment } from 'src/store/entities/attachments'

type Props = MenuProps & {
  attachmentId: string
}

export const Menu: React.FC<Props> = memo((props) => {
  const { attachmentId, ...rest } = props
  const { setThumbnailMenuOpened, onDelete } = useThumbnailAttachmentContext()
  const { attachment } = useAttachment(attachmentId)

  const handleThumbnailMenuOpen = useCallback(() => {
    setThumbnailMenuOpened(true)
  }, [setThumbnailMenuOpened])

  const handleThumbnailMenuClose = useCallback(() => {
    setThumbnailMenuOpened(false)
  }, [setThumbnailMenuOpened])

  return (
    <OrganismsMenu
      onOpen={handleThumbnailMenuOpen}
      onClose={handleThumbnailMenuClose}
      {...rest}
    >
      {props.children}
      <Portal>
        <MenuList>
          <MenuItem>
            <Link href={attachment.src} download>
              Download attachment
            </Link>
          </MenuItem>
          <MenuItem onClick={onDelete} color="alert">
            Delete attachment
          </MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})
