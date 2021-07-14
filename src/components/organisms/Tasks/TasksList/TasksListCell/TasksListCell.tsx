import React, { memo, useCallback } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { pxToNum } from 'src/shared/pxToNum'
import { ColumnResizer } from './ColumnResizer'

type Props = {
  hover?: boolean
  resizable?: boolean
  resizedMinW?: number
  resizedMaxW?: number
  onChangeSize?: (size: string) => void
  containerStyle?: FlexProps
} & FlexProps
export type TasksListCellProps = Props

export const TasksListCell: React.FC<Props> = memo<Props>(
  forwardRef((props, ref) => {
    const {
      hover,
      resizable,
      onChangeSize,
      resizedMinW,
      resizedMaxW,
      containerStyle,
      ...rest
    } = props

    const handleChange = useCallback(
      (margin: number) => {
        const width = pxToNum(containerStyle?.w as string)
        console.log('width: ', width, margin)
        onChangeSize?.(`${width + margin}px`)
      },
      [onChangeSize, containerStyle?.w],
    )

    return (
      <Flex
        h="37px"
        mr="-1px"
        {...containerStyle}
        ref={ref}
        position={containerStyle?.position || 'relative'}
        _hover={{
          zIndex: ((containerStyle?.zIndex as number) || 1) + 1,
        }}
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
  }),
)
TasksListCell.displayName = 'TasksListCell'
