import React, { memo, useCallback, useEffect } from 'react'
import { PopoverContent } from 'src/components/organisms'
import { Portal, Icon, Divider, Text } from 'src/components/atoms'
import { useAssigneeMenu } from './useAssigneeMenu'
import { useClickOutside } from 'src/hooks'
import { AssigneeItem } from './AssigneeItem'
import { ListItem, LeftContainer, RightContainer } from './ListItem'

type Props = {}

export const Content: React.FC<Props> = memo<Props>(() => {
  const { onClose, setAssignee } = useAssigneeMenu()
  const { ref, hasClickedOutside } = useClickOutside()

  const handleSelect = useCallback(
    (val: any) => {
      setAssignee(val)
      onClose()
    },
    [onClose, setAssignee],
  )

  useEffect(() => {
    if (hasClickedOutside) {
      onClose()
    }
  }, [hasClickedOutside, onClose])

  return (
    <Portal>
      <PopoverContent w="450px" ref={ref} mr={-3}>
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
