import type React from 'react'
import { memo, useCallback } from 'react'
import { useThumbnailAttachmentContext } from 'src/components/features/molecules/ThumbnailAttachment/Provider'
import { Link, Portal } from 'src/components/ui/atoms'
import {
  MenuItem,
  MenuList,
  type MenuProps,
  Menu as OrganismsMenu,
} from 'src/components/ui/organisms/Menu'
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
          <MenuItem onClick={onDelete} color="alert" isDisabled>
            Delete task file
          </MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})
Menu.displayName = 'Menu'
