import React, { useCallback } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { pxToNum } from 'src/shared/pxToNum'
import { ColumnResizer } from './ColumnResizer'

type Props = FlexProps & {
  hover?: boolean
  resizable?: boolean
  resizedMinW?: number
  resizedMaxW?: number
  onChangeSize?: (size: string) => void
}
export type TasksListCellProps = Props

export const TasksListCell: React.FC<Props> = forwardRef((props, ref) => {
  const {
    hover,
    resizable,
    onChangeSize,
    resizedMinW,
    resizedMaxW,
    w,
    minW,
    flex,
    position,
    left,
    zIndex,
    bg,
    ...rest
  } = props

  const handleChange = useCallback(
    (margin: number) => {
      const width = pxToNum(props.w as string)
      console.log('width: ', width, margin)
      onChangeSize?.(`${width + margin}px`)
    },
    [onChangeSize, props.w],
  )

  return (
    <Flex
      position={position || 'relative'}
      left={left}
      h="37px"
      mr="-1px"
      ref={ref}
      w={w}
      minW={minW}
      flex={flex}
      zIndex={zIndex || 1}
      _hover={{
        zIndex: ((zIndex as number) || 1) + 1,
      }}
      bg={bg}
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
        <ColumnResizer
          onChange={handleChange}
          resizedMinW={resizedMinW}
          resizedMaxW={resizedMaxW}
        />
      )}
    </Flex>
  )
})
