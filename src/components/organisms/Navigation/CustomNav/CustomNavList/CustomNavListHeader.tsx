import React, { memo } from 'react'
import { Heading, HeadingProps } from 'src/components/atoms'

type Props = HeadingProps

export const CustomNavListHeader: React.VFC<Props> = memo((props) => {
  return (
    <Heading
      as="h4"
      size="xs"
      color="text.muted"
      flex="1"
      textAlign="left"
      {...props}
    />
  )
})
CustomNavListHeader.displayName = 'CustomNavListHeader'
