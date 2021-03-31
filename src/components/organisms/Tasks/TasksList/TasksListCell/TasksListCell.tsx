import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const TasksListCell: React.FC<Props> = forwardRef((props, ref) => (
  <Flex
    fontWeight="normal"
    borderRight="1px"
    borderTop="1px"
    borderBottom="1px"
    borderLeft="none"
    borderColor="gray.200"
    alignItems="center"
    fontSize="xs"
    color="text.muted"
    py={0}
    px={2}
    h="37px"
    ref={ref}
    {...props}
  />
))
