import React, { memo, useCallback } from 'react'
import { Link, Portal } from 'src/components/atoms'
import {
  Menu as OrganismsMenu,
  MenuProps,
  MenuItem,
  MenuList,
} from 'src/components/organisms'
import { useThumbnailAttachment } from 'src/components/molecules/ThumbnailAttachment/ThumbnailAttachmentProvider'

type Props = MenuProps & {
  src: string
}

export const ThumbnailMenu: React.FC<Props> = memo((props) => {
  const { setThumbnailMenuOpened } = useThumbnailAttachment()

  const handleThumbnailMenuOpen = useCallback(() => {
    setThumbnailMenuOpened(true)
  }, [setThumbnailMenuOpened])

  const handleThumbnailMenuClose = useCallback(() => {
    setThumbnailMenuOpened(false)
  }, [setThumbnailMenuOpened])

  const { src, ...rest } = props

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
            <Link href={src} download>
              Download attachment
            </Link>
          </MenuItem>
          <MenuItem color="alert">Delete attachment</MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})
