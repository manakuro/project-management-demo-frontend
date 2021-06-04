import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps & {
  hover?: boolean
}

export const TasksListCell: React.FC<Props> = forwardRef((props, ref) => {
  const { hover, ...rest } = props
  return (
    <Flex
      fontWeight="normal"
      border={1}
      borderStyle="solid"
      borderColor="gray.200"
      mr="-1px"
      alignItems="center"
      fontSize="xs"
      color="text.muted"
      py={0}
      px={2}
      h="37px"
      {...(hover
        ? {
            _hover: {
              borderColor: 'gray.400',
              zIndex: 1,
            },
          }
        : {})}
      ref={ref}
      zIndex={0}
      {...rest}
    />
  )
})
