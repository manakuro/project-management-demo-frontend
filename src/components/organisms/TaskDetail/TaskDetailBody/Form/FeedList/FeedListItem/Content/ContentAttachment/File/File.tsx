import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { AttachmentBox } from 'src/components/molecules'

type Props = FlexProps & {
  taskFileId: string
}

export const File: React.VFC<Props> = memo<Props>((props) => {
  return (
    <AttachmentBox
      size="lg"
      bg="white"
      cursor="pointer"
      _hover={{
        borderColor: 'gray.400',
      }}
      {...props}
    />
  )
})
File.displayName = 'File'
