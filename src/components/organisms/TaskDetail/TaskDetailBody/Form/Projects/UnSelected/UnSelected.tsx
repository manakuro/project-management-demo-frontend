import React, { memo } from 'react'
import { Button, Box, Flex } from 'src/components/atoms'
import { Input } from '../Input'

type Props = {
  taskId: string
  onClick: () => void
  onClose: () => void
  isOpen: boolean
}

export const UnSelected: React.FC<Props> = memo<Props>((props) => {
  const { isOpen, onClose, taskId, onClick } = props

  return (
    <Flex flex={1}>
      {isOpen ? (
        <Input onClose={onClose} taskId={taskId} />
      ) : (
        <Button
          as={Box}
          variant="ghost"
          size="sm"
          border="1px"
          borderColor="transparent"
          onClick={onClick}
          cursor="pointer"
          fontSize="sm"
        >
          Add to projects
        </Button>
      )}
    </Flex>
  )
})
UnSelected.displayName = 'UnSelected'
