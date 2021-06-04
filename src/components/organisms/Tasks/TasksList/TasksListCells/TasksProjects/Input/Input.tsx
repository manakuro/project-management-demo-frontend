import React, { memo } from 'react'
import { Flex, Input as AtomsInput, Wrap, WrapItem } from 'src/components/atoms'
import { ProjectMenu } from 'src/components/organisms'
import { useClickOutside } from 'src/hooks'
import { ProjectChip } from 'src/components/molecules'
import { useTask } from 'src/store/entities/tasks'
import { useDisclosure } from 'src/shared/chakra'

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
  const { ref } = useClickOutside(onClose)

  return (
    <ProjectMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      placement="top-start"
    >
      <Flex
        ref={ref}
        border={1}
        borderColor="teal.400"
        borderStyle="solid"
        alignItems="center"
        px={2}
        h={HEIGHT}
        maxH={HEIGHT}
        position="absolute"
        left="-1px"
        top="-1px"
        bg="white"
        borderRadius="none"
        w="300px"
      >
        <Wrap height="37px" py={2} justifyItems="center" display="flex">
          {[task.projectId].map((id) => (
            <WrapItem key={id}>
              <ProjectChip projectId={id} deletable />
            </WrapItem>
          ))}
          <WrapItem>
            <AtomsInput
              autoFocus
              fontSize="sm"
              size="sm"
              variant="unstyled"
              color="text.base"
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </ProjectMenu>
  )
})
Input.displayName = 'Input'
