import React from 'react'
import { Flex, Text } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { Container } from './Container'
import { NewBox } from 'src/components/molecules'

type Props = {}

export const ListItemListNew: React.VFC<Props> = () => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <Container>
      <NewBox size="md" />
      <Flex ml={3} flex={1} alignItems="center">
        <Text fontSize="sm" {...clickableHoverLightStyle}>
          New Project
        </Text>
      </Flex>
    </Container>
  )
}
