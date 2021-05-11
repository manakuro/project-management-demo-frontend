import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useThumbnailAttachment } from './ThumbnailAttachmentProvider'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const Container: React.VFC<Props> = forwardRef((props) => {
  const { ref } = useThumbnailAttachment()

  return (
    <Flex
      ref={ref}
      minW="60px"
      h={16}
      borderRadius="lg"
      cursor="pointer"
      position="relative"
      {...props}
    />
  )
})
