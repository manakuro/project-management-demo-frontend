import React, { memo, useCallback } from 'react'
import { PopoverContent } from 'src/components/organisms'
import { Portal, Icon, Divider, Text, Spinner } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import { TagItem } from './TagItem'
import { ListItem, LeftContainer, RightContainer } from './ListItem'
import { Tag } from 'src/store/entities/tags'

type Props = {
  onClose?: () => void
  onClosed?: () => void
  onSelect: (val: string) => void
  tags: Tag[]
  loading: boolean
  queryText: string
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useClickOutside(props.onClose)

  const handleSelect = useCallback(
    (val: string) => {
      props.onSelect(val)
      props.onClose?.()
      props.onClosed?.()
    },
    [props],
  )

  return (
    <Portal>
      <PopoverContent className="focus-visible" w="450px" ref={ref} mr={-3}>
        {props.loading ? (
          <ListItem index={-1} alignItems="center" justifyContent="center">
            <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
          </ListItem>
        ) : (
          <>
            {props.tags.map((t, i) => (
              <TagItem key={t.id} onClick={handleSelect} tag={t} index={i} />
            ))}
            <Divider />
            <ListItem index={props.tags.length}>
              <LeftContainer>
                <Icon icon="plus" color="primary" />
              </LeftContainer>
              <RightContainer>
                <Text fontSize="sm" color="primary" fontWeight="medium">
                  {`Create project for '${props.queryText}'`}
                </Text>
              </RightContainer>
            </ListItem>
          </>
        )}
      </PopoverContent>
    </Portal>
  )
})
