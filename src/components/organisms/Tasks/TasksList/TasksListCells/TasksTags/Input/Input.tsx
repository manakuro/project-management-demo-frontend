import React, { memo, useCallback, useMemo, useState } from 'react'
import { Flex, Input as AtomsInput, Wrap, WrapItem } from 'src/components/atoms'
import { TagChip } from 'src/components/molecules'
import { TagMenu } from 'src/components/organisms/Menus'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useTagIdsByTaskId } from 'src/store/entities/tags'

type Props = {
  taskId: string
  focused: boolean
  onClose: () => void
}

const HEIGHT = '37px'
export const Input: React.VFC<Props> = memo((props) => {
  const { taskId, onClose } = props
  const popoverDisclosure = useDisclosure()
  const { tagIds } = useTagIdsByTaskId(taskId)
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helper) => {
      if (helper.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const [value, setValue] = useState<string>('')
  const hasMultipleTags = useMemo<boolean>(
    () => tagIds.length > 1,
    [tagIds.length],
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

  const handleSelect = useCallback(
    (val: string) => {
      console.log(val)
      onClose()
    },
    [onClose],
  )

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
        maxH={hasMultipleTags ? 'auto' : HEIGHT}
        position="absolute"
        right="0"
        top="0"
        bg="white"
        borderRadius="none"
        w="300px"
      >
        <Wrap minH={HEIGHT} py={2} justifyItems="center" display="flex">
          {tagIds.map((id) => (
            <WrapItem key={id}>
              <TagChip tagId={id} deletable variant="button" />
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
