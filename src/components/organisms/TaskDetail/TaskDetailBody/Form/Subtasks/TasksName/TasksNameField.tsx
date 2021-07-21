import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Flex, Input, InputProps } from 'src/components/atoms'
import { useClickOutside, useDebounce } from 'src/hooks'
import { useSubtasksNameContext } from './Provider'

type Props = {
  value: string
  onChange: (val: string) => void
  deleteTask?: () => Promise<void>
  isNew: boolean
  focusedBorder?: boolean
} & Omit<InputProps, 'onChange'>

export const TasksNameField: React.FC<Props> = memo<Props>((props) => {
  const [value, setValue] = useState<string>(props.value)
  const {
    ref: containerRef,
    onInputFocus,
    onInputBlur,
    inputFocused,
    isTransitioning,
  } = useSubtasksNameContext()
  const autoFocus = useMemo(() => props.isNew, [props.isNew])
  const skipElement = useCallback(
    (e: Event) => {
      if (containerRef.current?.contains(e.target as Node) ?? false) return true
      return false
    },
    [containerRef],
  )
  const { ref, removeEventListener } = useClickOutside(
    async () => {
      if (!value) await props.deleteTask?.()
    },
    {
      skip: !props.isNew,
      skipElement,
    },
  )
  useEffect(() => {
    if (!props.isNew) removeEventListener()
  }, [props.isNew, removeEventListener])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useDebounce(value, props.onChange, 500)

  const style = useMemo<InputProps>(() => {
    let val: InputProps = {
      ml: 1,
      fontSize: 'sm',
      color: 'text.base',
      minH: 5,
      h: 5,
      paddingInlineStart: 2,
      paddingInlineEnd: 2,
      border: 'none',
    }
    if (isTransitioning)
      val = {
        ...val,
        color: 'gray.50',
      }

    if (props.focusedBorder)
      val = {
        ...val,
        border: '1px',
        borderColor: 'transparent',
        borderRadius: 'sm',
        _hover: {
          borderColor: 'gray.400',
        },
      }
    return val
  }, [isTransitioning, props.focusedBorder])

  return (
    <Flex
      position="relative"
      maxWidth="70%"
      minW={props.isNew ? '150px' : ''}
      ref={ref}
    >
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
        placeholder={inputFocused ? 'Write a task name' : ''}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        autoFocus={autoFocus}
      />
    </Flex>
  )
})
TasksNameField.displayName = 'TasksNameField'
