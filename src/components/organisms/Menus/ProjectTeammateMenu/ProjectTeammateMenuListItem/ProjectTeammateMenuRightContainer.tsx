import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const ProjectTeammateMenuRightContainer: React.FC<Props> = memo<Props>(
  (props) => {
    return <Flex alignItems="center" flex={1} ml={2} {...props} />
  },
)
