import React from 'react'
import { DashedBox, Flex, FlexProps, Icon } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { Container } from './Container'

type Props = {
  containerStyle?: FlexProps
}

export const ProjectTileItemNew: React.VFC<Props> = (props) => {
  const { containerStyle } = props
  return (
    <Container name="New Project" {...containerStyle}>
      {({ showTransition }) => (
        <DashedBox borderRadius="3xl" p={2} w="120px" h="120px">
          <Flex
            {...(showTransition
              ? {
                  transform: 'translate(0, -3px)',
                }
              : {})}
            transition={transitions.base()}
          >
            <Icon size="3xl" icon="plus" />
          </Flex>
        </DashedBox>
      )}
    </Container>
  )
}
