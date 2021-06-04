import React, { memo, useCallback } from 'react'
import { PopoverContent } from 'src/components/organisms'
import { Portal, Icon, Divider, Text } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import { ProjectItem } from './ProjectItem'
import { ListItem, LeftContainer, RightContainer } from './ListItem'

type Props = {
  onClose?: () => void
  onClosed?: () => void
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useClickOutside(props.onClose)

  const handleSelect = useCallback(
    (val: string) => {
      console.log('handleSelect!: ', val)
      props.onClose?.()
      props.onClosed?.()
    },
    [props],
  )

  return (
    <Portal>
      <PopoverContent className="focus-visible" w="450px" ref={ref} mr={-3}>
        <ProjectItem onClick={handleSelect} projectId="1" index={0} />
        <Divider />
        <ListItem index={1}>
          <LeftContainer>
            <Icon icon="plus" color="primary" />
          </LeftContainer>
          <RightContainer>
            <Text fontSize="sm" color="primary" fontWeight="medium">
              Create project for `...`
            </Text>
          </RightContainer>
        </ListItem>
      </PopoverContent>
    </Portal>
  )
})
