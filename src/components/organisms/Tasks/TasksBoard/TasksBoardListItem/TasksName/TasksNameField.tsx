import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Flex, InputText, InputProps } from 'src/components/atoms'
import { useTaskDetailListDetailRef } from 'src/components/organisms/Tasks/TasksList/TasksListDetail/useTaskListDetailRef'
import { useClickOutside, useDebounce } from 'src/hooks'
import { ChakraProps } from 'src/shared/chakra'
import { useTasksNameContext } from './Provider'

type Props = {
  value: string
  onChange: (val: string) => void
  isNew?: boolean
  deleteTask?: () => Promise<void>
  focusedBorder?: boolean
} & Omit<InputProps, 'onChange'>

export const TasksNameField: React.FC<Props> = memo<Props>((props) => {
  const [value, setValue] = useState<string>(props.value)
  const {
    ref: containerRef,
    onInputFocus,
    onInputBlur,
    isTransitioning,
  } = useTasksNameContext()
  const { taskDetailListDetailRef } = useTaskDetailListDetailRef()
  const autoFocus = useMemo(() => props.isNew, [props.isNew])
  const skipElement = useCallback(
    (e: Event) => {
      if (containerRef.current?.contains(e.target as Node) ?? false) return true
      if (taskDetailListDetailRef?.contains(e.target as Node) ?? false)
        return true

      return false
    },
    [containerRef, taskDetailListDetailRef],
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    [],
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault()
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (props.isNew) {
      onInputFocus()
    }
  }, [onInputFocus, props.isNew])

  useDebounce(value, props.onChange, 500)

  const style = useMemo<ChakraProps>(() => {
    let val: ChakraProps = {}
    if (isTransitioning)
      val = {
        ...val,
        color: 'gray.50',
      }
    return val
  }, [isTransitioning])

  return (
    <Flex position="relative" minW="150px" ref={ref}>
      <InputText
        value={value}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        fontSize="sm"
        placeholder="Write a task name"
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        autoFocus={autoFocus}
        borderRadius="sm"
        minH="23px"
        containerStyle={{
          ml: 1,
          maxH: 20,
        }}
        {...style}
      />
    </Flex>
  )
})
TasksNameField.displayName = 'TasksNameField'
