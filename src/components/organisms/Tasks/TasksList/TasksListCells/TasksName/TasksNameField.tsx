import React, { memo, useCallback, useMemo } from 'react'
import { Box, Flex, Input, InputProps } from 'src/components/atoms'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName/TasksNameProvider'

type Props = {
  value: string
  onChange: (val: string) => void
  focusedBorder?: boolean
} & InputProps

export const TasksNameField: React.FC<Props> = memo<Props>((props) => {
  const { onInputFocus, onInputBlur } = useTasksName()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      props.onChange(value)
    },
    [props],
  )

  const style = useMemo<InputProps>(
    () => ({
      ml: 1,
      fontSize: 'sm',
      color: 'text.base',
      minH: 5,
      h: 5,
      paddingInlineStart: 2,
      paddingInlineEnd: 2,
      ...(props.focusedBorder
        ? {
            border: '1px',
            borderColor: 'transparent',
            borderRadius: 'sm',
            _hover: {
              borderColor: 'gray.400',
            },
          }
        : {
            border: 'none',
          }),
    }),
    [props.focusedBorder],
  )

  return (
    <Flex position="relative">
      <Box {...style} visibility="hidden">
        {props.value}
      </Box>
      <Input
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        value={props.value}
        {...style}
        position="absolute"
        top={0}
        focusBorderColor="transparent"
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
    </Flex>
  )
})
