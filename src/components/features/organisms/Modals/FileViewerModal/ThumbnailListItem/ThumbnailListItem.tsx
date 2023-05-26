import React, { useMemo } from 'react'
import { Center, Icon, Image } from 'src/components/ui/atoms'
import { FileTypeCode } from 'src/graphql/enums'
import { ChakraProps } from 'src/shared/chakra'
import { useTaskFile, getTaskFileIcon } from 'src/store/entities/taskFile'
import { Container } from './Container'

type Props = {
  taskFileId: string
}

export const ThumbnailListItem: React.FC<Props> = (props) => {
  const { taskFileId } = props
  const { taskFile } = useTaskFile(taskFileId)
  const style = useMemo<ChakraProps>(
    () => ({
      bg: 'gray.50',
      borderRadius: 'md',
      h: 'full',
      w: 'full',
    }),
    [],
  )

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image: {
      return (
        <Container label={taskFile.name}>
          <Image src={taskFile.src} objectFit="cover" {...style} />
        </Container>
      )
    }
    case FileTypeCode.Pdf:
    case FileTypeCode.Text: {
      const icon = getTaskFileIcon(taskFile.fileType.typeCode)
      return (
        <Container label={taskFile.name}>
          <Center {...style}>
            <Icon icon={icon} color="primary" />
          </Center>
        </Container>
      )
    }
  }
}
