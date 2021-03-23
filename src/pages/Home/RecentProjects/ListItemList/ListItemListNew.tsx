import React from 'react'
import { Flex, Text, Icon } from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { Container } from './Container'

type Props = {}

export const ListItemListNew: React.VFC<Props> = () => {
  const { clickableHoverLightStyle } = useClickableHover()

  return (
    <Container>
      <Flex
        border="dashed 2px"
        borderColor="gray.300"
        borderRadius="md"
        p={2}
        w={12}
        h={12}
        color="text.muted"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        {...clickableHoverLightStyle}
      >
        <Icon size="md" icon="plus" />
      </Flex>
      <Flex ml={3} flex={1} alignItems="center">
        <Text fontSize="sm" {...clickableHoverLightStyle}>
          New Project
        </Text>
      </Flex>
    </Container>
  )
}
