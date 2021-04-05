import React, { memo } from 'react'
import { Box, Button, Icon, Text } from 'src/components/atoms'

type Props = {}

export const Section: React.FC<Props> = memo<Props>((props) => {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Text fontSize="xs">Backlog</Text>
      <Icon
        ml={1}
        mt="1px"
        icon="chevronDown"
        color="text.muted"
        size="md"
        onClick={(e) => {
          e.stopPropagation()
          console.log('click!')
        }}
      />
    </Button>
  )
})
