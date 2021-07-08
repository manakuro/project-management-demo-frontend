import React, { useCallback } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { ColumnResizer } from './ColumnResizer'

type Props = FlexProps & {
  hover?: boolean
  resizable?: boolean
  resizedMinW?: number
  onChangeSize?: (size: string) => void
}
export type TasksListCellProps = Props

export const TasksListCell: React.FC<Props> = forwardRef((props, ref) => {
  const {
    hover,
    resizable,
    onChangeSize,
    resizedMinW,
    w,
    minW,
    flex,
    ...rest
  } = props

  const handleChange = useCallback(
    (margin: number) => {
      console.log('margin: ', margin)
      onChangeSize?.(`calc(${props.w} + ${margin}px)`)
    },
    [onChangeSize, props.w],
  )

  return (
    <Flex
      position="relative"
      mr="-1px"
      h="37px"
      ref={ref}
      w={w}
      minW={minW}
      flex={flex}
    >
      <Flex
        w="100%"
        fontWeight="normal"
        border={1}
        borderStyle="solid"
        borderColor="gray.200"
        alignItems="center"
        fontSize="xs"
        color="text.muted"
        py={0}
        px={2}
        {...(hover
          ? {
              zIndex: 0,
              _hover: {
                borderColor: 'gray.400',
                zIndex: 1,
              },
            }
          : {})}
        {...rest}
      >
        {props.children}
      </Flex>
      {resizable && (
        <ColumnResizer onChange={handleChange} resizedMinW={resizedMinW} />
      )}
    </Flex>
  )
})
