import React, { memo, useCallback } from 'react'
import { Portal, Icon, Divider, Text, Spinner } from 'src/components/atoms'
import { PopoverContent } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import { Teammate } from 'src/store/entities/teammates'
import { ListItem, LeftContainer, RightContainer } from './ListItem'
import { ProjectTeammateItem } from './ProjectTeammateItem'

type Props = {
  onClose?: () => void
  onClosed?: () => void
  onSelect: (val: string) => void
  teammates: Teammate[]
  loading: boolean
  queryText: string
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { teammates, loading, onClose, onClosed, onSelect } = props
  const { ref } = useClickOutside(onClose)

  const handleSelect = useCallback(
    (val: string) => {
      onSelect(val)
      onClose?.()
      onClosed?.()
    },
    [onClose, onClosed, onSelect],
  )

  return (
    <Portal>
      <PopoverContent className="focus-visible" w="450px" ref={ref} mr={-3}>
        {loading ? (
          <ListItem index={-1} alignItems="center" justifyContent="center">
            <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
          </ListItem>
        ) : (
          <>
            {teammates.map((t, i) => (
              <ProjectTeammateItem
                key={t.id}
                onClick={handleSelect}
                teammate={t}
                index={i}
              />
            ))}
            <Divider />
            <ListItem index={teammates.length}>
              <LeftContainer>
                <Icon icon="userPlus" color="primary" />
              </LeftContainer>
              <RightContainer>
                <Text fontSize="sm" color="primary" fontWeight="medium">
                  {`Invite '${props.queryText}' via email`}
                </Text>
              </RightContainer>
            </ListItem>
          </>
        )}
      </PopoverContent>
    </Portal>
  )
})
Content.displayName = 'Content'
