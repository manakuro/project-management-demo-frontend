import React from 'react'
import { Flex, FlexProps, Text } from 'src/components/atoms'
import { NewBox } from 'src/components/molecules'
import { useClickableHoverStyle } from 'src/hooks'
import { Container } from './Container'

type Props = FlexProps

export const ProjectListItemNew: React.VFC<Props> = (props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <Container {...props}>
      <NewBox size="md" />
      <Flex ml={3} flex={1} alignItems="center">
        <Text fontSize="sm" {...clickableHoverLightStyle}>
          New Project
        </Text>
      </Flex>
    </Container>
  )
}
ProjectListItemNew.displayName = 'ProjectListItemNew'
