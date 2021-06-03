import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Flex, Input, InputProps } from 'src/components/atoms'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName/TasksNameProvider'
import { useDebounce } from 'src/hooks'

type Props = {
  value: string
  onChange: (val: string) => void
  focusedBorder?: boolean
} & Omit<InputProps, 'onChange'>

export const TasksNameField: React.FC<Props> = memo<Props>((props) => {
  const [value, setValue] = useState<string>(props.value)
  const { onInputFocus, onInputBlur } = useTasksName()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useDebounce(value, props.onChange, 500)

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
    <Flex position="relative" maxWidth="70%">
      <Box as="span" {...style} visibility="hidden">
        {value}
      </Box>
      <Input
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        value={value}
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
