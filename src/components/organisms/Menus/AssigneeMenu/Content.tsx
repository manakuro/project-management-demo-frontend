import React, { memo, useCallback } from 'react'
import { Portal, Icon, Divider, Text } from 'src/components/atoms'
import { PopoverContent } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import { AssigneeItem } from './AssigneeItem'
import { ListItem, LeftContainer, RightContainer } from './ListItem'
import { useAssigneeMenu } from './useAssigneeMenu'

type Props = {
  onClosed?: () => void
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { onClose, setAssignee } = useAssigneeMenu()
  const { ref } = useClickOutside(onClose)

  const handleSelect = useCallback(
    (val: any) => {
      console.log('handleSelect!: ', val)
      setAssignee(val)
      onClose()
      props.onClosed?.()
    },
    [onClose, props, setAssignee],
  )

  return (
    <Portal>
      <PopoverContent className="focus-visible" w="450px" ref={ref} mr={-3}>
        <AssigneeItem onClick={handleSelect} assignee={{}} index={0} />
        <Divider />
        <ListItem index={1}>
          <LeftContainer>
            <Icon icon="userPlus" color="primary" />
          </LeftContainer>
          <RightContainer>
            <Text fontSize="sm" color="primary" fontWeight="medium">
              Invite teammates via email
            </Text>
          </RightContainer>
        </ListItem>
        <Divider />
        <ListItem index={2}>
          <LeftContainer>
            <Icon icon="plus" color="primary" />
          </LeftContainer>
          <RightContainer>
            <Text fontSize="sm" color="primary" fontWeight="medium">
              Assign duplicate tasks
            </Text>
          </RightContainer>
        </ListItem>
      </PopoverContent>
    </Portal>
  )
})
