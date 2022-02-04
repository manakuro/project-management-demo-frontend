import React, { memo, useCallback } from 'react'
import { Link, Portal } from 'src/components/atoms'
import { useThumbnailAttachmentContext } from 'src/components/molecules/ThumbnailAttachment/Provider'
import {
  Menu as OrganismsMenu,
  MenuProps,
  MenuItem,
  MenuList,
} from 'src/components/organisms/Menu'
import { useTaskFile } from 'src/store/entities/taskFile'

type Props = MenuProps & {
  taskFileId: string
}

export const Menu: React.FC<Props> = memo((props) => {
  const { taskFileId, ...rest } = props
  const { setThumbnailMenuOpened, onDelete } = useThumbnailAttachmentContext()
  const { taskFile } = useTaskFile(taskFileId)

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
            <Link href={taskFile.src} download>
              Download taskFile
            </Link>
          </MenuItem>
          <MenuItem onClick={onDelete} color="alert">
            Delete taskFile
          </MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})
Menu.displayName = 'Menu'
