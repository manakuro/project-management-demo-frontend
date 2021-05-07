import React from 'react'
import { Flex, Icon } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { Container } from './Container'

type Props = {}

export const ListItemTileNew: React.VFC<Props> = () => {
  return (
    <Container name="New Project">
      {({ showTransition }) => (
        <Flex
          border="dashed 2px"
          borderColor="gray.300"
          borderRadius="3xl"
          p={2}
          w="120px"
          h="120px"
          color="text.muted"
          position="relative"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
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
        </Flex>
      )}
    </Container>
  )
}
