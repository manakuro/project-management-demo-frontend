import React from 'react'
import { Flex, Text, Icon, DashedBox } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { Container } from './Container'

type Props = {}

export const ListItemListNew: React.VFC<Props> = () => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <Container>
      <DashedBox w={12} h={12}>
        <Icon size="md" icon="plus" />
      </DashedBox>
      <Flex ml={3} flex={1} alignItems="center">
        <Text fontSize="sm" {...clickableHoverLightStyle}>
          New Project
        </Text>
      </Flex>
    </Container>
  )
}
