import React, { memo, useCallback } from 'react'
import { Link, Portal } from 'src/components/atoms'
import {
  Menu as OrganismsMenu,
  MenuProps,
  MenuItem,
  MenuList,
} from 'src/components/organisms'
import { useThumbnailAttachment } from 'src/components/molecules/ThumbnailAttachment/Provider'
import { useAttachment } from 'src/store/attachments'

type Props = MenuProps & {
  attachmentId: string
}

export const Menu: React.FC<Props> = memo((props) => {
  const { attachmentId, ...rest } = props
  const { setThumbnailMenuOpened } = useThumbnailAttachment()
  const { attachment } = useAttachment(attachmentId)

  const handleThumbnailMenuOpen = useCallback(() => {
    setThumbnailMenuOpened(true)
  }, [setThumbnailMenuOpened])

  const handleThumbnailMenuClose = useCallback(() => {
    setThumbnailMenuOpened(false)
  }, [setThumbnailMenuOpened])

  return (
    <OrganismsMenu
      isLazy
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
          <MenuItem color="alert">Delete attachment</MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})
