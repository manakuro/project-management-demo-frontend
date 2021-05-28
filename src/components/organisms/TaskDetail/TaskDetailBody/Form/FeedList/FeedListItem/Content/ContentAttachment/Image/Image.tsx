import React, { memo } from 'react'
import {
  Flex,
  FlexProps,
  Image as AtomsImage,
  Link,
  Text,
} from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'

type Props = FlexProps & {
  attachmentId: string
}

export const Image: React.VFC<Props> = memo<Props>((props) => {
  const { onClick, ...rest } = props
  const { attachment } = useAttachment(props.attachmentId)

  return (
    <Flex flexDirection="column" {...rest}>
      <AtomsImage
        onClick={onClick}
        src={attachment.src}
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
        {attachment.name}・
        <Link
          href={attachment.src}
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
