import React from 'react'
import { ComingSoonTooltip } from 'src/components/features/molecules/Tooltips'
import { Flex, FlexProps, Text } from 'src/components/ui/atoms'
import { NewBox } from 'src/components/ui/molecules/NewBox'
import { useClickableHoverStyle } from 'src/hooks'
import { Container } from './Container'

type Props = FlexProps

export const ProjectListItemNew: React.FC<Props> = (props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <Container {...props}>
      <ComingSoonTooltip>
        <NewBox size="md" />
        <Flex ml={3} flex={1} alignItems="center">
          <Text fontSize="sm" {...clickableHoverLightStyle}>
            New Project
          </Text>
        </Flex>
      </ComingSoonTooltip>
    </Container>
  )
}
ProjectListItemNew.displayName = 'ProjectListItemNew'
