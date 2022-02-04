import React, { memo } from 'react'
import {
  Flex,
  FlexProps,
  Image as AtomsImage,
  Link,
  Text,
} from 'src/components/atoms'
import { useTaskFile } from 'src/store/entities/taskFile'

type Props = FlexProps & {
  taskFileId: string
}

export const Image: React.VFC<Props> = memo<Props>((props) => {
  const { onClick, taskFileId, ...rest } = props
  const { taskFile } = useTaskFile(taskFileId)

  return (
    <Flex flexDirection="column" {...rest}>
      <AtomsImage
        onClick={onClick}
        src={taskFile.src}
        bg="gray.50"
        width="auto"
        border={1}
        borderColor="gray.100"
        borderStyle="solid"
        borderRadius="md"
        objectFit="cover"
        _hover={{
          borderColor: 'gray.400',
        }}
        maxW="240px"
        cursor="pointer"
      />
      <Text
        as="span"
        fontSize="xs"
        fontWeight="medium"
        color="text.muted"
        mt={1}
      >
        {taskFile.name}・
        <Link
          href={taskFile.src}
          fontSize="xs"
          color="text.muted"
          download
          hover
          onClick={(e) => e.stopPropagation()}
        >
          Download
        </Link>
      </Text>
    </Flex>
  )
})
Image.displayName = 'Image'
