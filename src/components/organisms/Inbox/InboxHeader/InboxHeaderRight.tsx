import React, { memo } from 'react'
import { Flex, FlexProps, Stack } from 'src/components/ui/atoms'

type Props = FlexProps & {
  spacing?: number
}

export const InboxHeaderRight: React.FC<Props> = memo<Props>((props) => {
  const { children, ...rest } = props

  return (
    <Flex ml="auto" {...rest}>
      <Stack spacing={props.spacing ?? 4} direction="row">
        {children}
      </Stack>
    </Flex>
  )
})
InboxHeaderRight.displayName = 'InboxHeaderRight'
