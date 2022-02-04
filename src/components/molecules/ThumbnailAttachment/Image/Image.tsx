import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { Image as AtomsImage } from 'src/components/atoms'
import { Container } from 'src/components/molecules/ThumbnailAttachment/Container'
import { Menu } from 'src/components/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/molecules/ThumbnailAttachment/MenuButton'
import { Overlay } from 'src/components/molecules/ThumbnailAttachment/Overlay'
import { useThumbnailAttachmentContext } from 'src/components/molecules/ThumbnailAttachment/Provider'
import { Tooltip } from 'src/components/molecules/ThumbnailAttachment/Tooltip'
import { useTaskFile } from 'src/store/entities/taskFile'

type Props = FlexProps & {
  taskFileId: string
}

export const Image: React.VFC<Props> = (props) => {
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
