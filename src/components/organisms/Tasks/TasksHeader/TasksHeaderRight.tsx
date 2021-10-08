import React, { memo } from 'react'
import { Flex, FlexProps, Stack } from 'src/components/atoms'

type Props = FlexProps & {
  spacing?: number
}

export const TasksHeaderRight: React.FC<Props> = memo<Props>((props) => {
  const { children, ...rest } = props

  return (
    <Flex {...rest}>
      <Stack spacing={props.spacing ?? 2} direction="row">
        {children}
      </Stack>
    </Flex>
  )
})
TasksHeaderRight.displayName = 'TasksHeaderRight'
