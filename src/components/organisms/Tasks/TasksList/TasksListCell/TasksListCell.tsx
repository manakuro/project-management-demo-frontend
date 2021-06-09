import React, { useCallback } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { ColumnResizer } from './ColumnResizer'

type Props = FlexProps & {
  hover?: boolean
  resizable?: boolean
  onChangeSize?: (size: string) => void
}

export const TasksListCell: React.FC<Props> = forwardRef((props, ref) => {
  const { hover, resizable, onChangeSize, ...rest } = props

  const handleChange = useCallback(
    (margin: number) => {
      onChangeSize?.(`calc(${props.w} + ${margin})`)
    },
    [onChangeSize, props.w],
  )

  return (
    <Flex
      position="relative"
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
            zIndex: 0,
            _hover: {
              borderColor: 'gray.400',
              zIndex: 1,
            },
          }
        : {})}
      ref={ref}
      {...rest}
    >
      {props.children}
      {resizable && <ColumnResizer onChange={handleChange} />}
    </Flex>
  )
})
