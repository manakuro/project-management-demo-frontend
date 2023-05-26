import React from 'react'
import { Container } from 'src/components/features/molecules/ThumbnailAttachment/Container'
import { Menu } from 'src/components/features/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/features/molecules/ThumbnailAttachment/MenuButton'
import { Overlay } from 'src/components/features/molecules/ThumbnailAttachment/Overlay'
import { useThumbnailAttachmentContext } from 'src/components/features/molecules/ThumbnailAttachment/Provider'
import { Tooltip } from 'src/components/features/molecules/ThumbnailAttachment/Tooltip'
import { FlexProps } from 'src/components/ui/atoms'
import { Image as AtomsImage } from 'src/components/ui/atoms'
import { useTaskFile } from 'src/store/entities/taskFile'

type Props = FlexProps & {
  taskFileId: string
}

export const Image: React.FC<Props> = (props) => {
  const { taskFileId, ...rest } = props
  const { taskFile } = useTaskFile(taskFileId)
  const { isHovering } = useThumbnailAttachmentContext()

  return (
    <Tooltip taskFileId={taskFileId}>
      <Container bg="gray.50" {...rest}>
        <AtomsImage
          width="auto"
          maxH={16}
          maxW="240px"
          src={taskFile.src}
          borderRadius="lg"
          objectFit="cover"
        />
        <Overlay isHovering={isHovering} />
        <Menu taskFileId={taskFileId}>
          <MenuButton color="white" light />
        </Menu>
      </Container>
    </Tooltip>
  )
}
