import React from 'react'
import { Box, Flex, FlexProps, Image } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = FlexProps & {
  image: string
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  const { image, ...rest } = props
  return (
    <Tooltip hasArrow label={props.image} aria-label={props.image} size="sm">
      <Flex
        {...rest}
        minW="60px"
        h={16}
        bg="gray.50"
        borderRadius="lg"
        cursor="pointer"
        position="relative"
      >
        <Image
          width="auto"
          maxH={16}
          maxW="240px"
          src={image}
          borderRadius="lg"
          objectFit="cover"
        />
        <Box
          borderRadius="lg"
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg="gray.700"
          opacity={0}
          _hover={{ opacity: 0.5 }}
        />
      </Flex>
    </Tooltip>
  )
}
