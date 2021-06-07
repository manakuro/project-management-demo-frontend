import React, { memo, useCallback, useMemo, useState } from 'react'
import { Flex, Input as AtomsInput, Wrap, WrapItem } from 'src/components/atoms'
import { TagMenu } from 'src/components/organisms'
import { useClickOutside } from 'src/hooks'
import { TagChip } from 'src/components/molecules'
import { useTask } from 'src/store/entities/tasks'
import { useDisclosure } from 'src/shared/chakra'
import { useTagByTask } from 'src/store/entities/tags'

type Props = {
  taskId: string
  focused: boolean
  onClose: () => void
}

const HEIGHT = '37px'
export const Input: React.VFC<Props> = memo((props) => {
  const { taskId, onClose } = props
  const popoverDisclosure = useDisclosure()
  const { task } = useTask(taskId)
  const { tagIds } = useTagByTask(taskId)
  const { ref } = useClickOutside(onClose)
  const [value, setValue] = useState<string>('')
  const hasMultipleProjects = useMemo<boolean>(
    () => task.projectIds.length > 1,
    [task.projectIds.length],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)
      if (val) {
        popoverDisclosure.onOpen()
        return
      }
      popoverDisclosure.onClose()
    },
    [popoverDisclosure],
  )

  const handleSelect = useCallback((val: string) => {
    console.log(val)
  }, [])

  return (
    <TagMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="top-start"
      queryText={value}
    >
      <Flex
        ref={ref}
        border={1}
        borderColor="teal.400"
        borderStyle="solid"
        alignItems="center"
        px={2}
        minH={HEIGHT}
        maxH={hasMultipleProjects ? 'auto' : HEIGHT}
        position="absolute"
        right="-1px"
        top="-1px"
        bg="white"
        borderRadius="none"
        w="300px"
      >
        <Wrap minH={HEIGHT} py={2} justifyItems="center" display="flex">
          {tagIds.map((id) => (
            <WrapItem key={id}>
              <TagChip tagId={id} deletable />
            </WrapItem>
          ))}
          <WrapItem>
            <AtomsInput
              autoFocus
              fontSize="sm"
              size="sm"
              variant="unstyled"
              color="text.base"
              value={value}
              onChange={handleChange}
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </TagMenu>
  )
})
Input.displayName = 'Input'
