import React, { memo } from 'react'
import { AttachmentBox } from 'src/components/molecules'
import { FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps & {
  taskFileId: string
}

export const File: React.FC<Props> = memo<Props>((props) => {
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
