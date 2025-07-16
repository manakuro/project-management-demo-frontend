import type React from 'react'
import { memo } from 'react'
import { Flex, type FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const SearchMenuRightContainer: React.FC<Props> = memo<Props>(
  (props) => {
    return <Flex alignItems="center" flex={1} ml={2} {...props} />
  },
)
SearchMenuRightContainer.displayName = 'SearchMenuRightContainer'
