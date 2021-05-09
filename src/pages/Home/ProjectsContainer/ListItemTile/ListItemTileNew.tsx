import React from 'react'
import { DashedBox, Flex, Icon } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { Container } from './Container'

type Props = {}

export const ListItemTileNew: React.VFC<Props> = () => {
  return (
    <Container name="New Project">
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
