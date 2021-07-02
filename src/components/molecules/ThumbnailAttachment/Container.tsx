import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useThumbnailAttachmentContext } from './Provider'

type Props = FlexProps

export const Container: React.VFC<Props> = (props) => {
  const { ref } = useThumbnailAttachmentContext()

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
}
