import React, { memo, useCallback } from 'react'
import { PopoverContent } from 'src/components/organisms'
import { Portal, Icon, Divider, Text, Spinner } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import { ProjectItem } from './ProjectItem'
import { ListItem, LeftContainer, RightContainer } from './ListItem'
import { Project } from 'src/store/entities/projects'

type Props = {
  onClose?: () => void
  onClosed?: () => void
  onSelect: (val: string) => void
  projects: Project[]
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
            {props.projects.map((p, i) => (
              <ProjectItem
                key={p.id}
                onClick={handleSelect}
                project={p}
                index={i}
              />
            ))}
            <Divider />
            <ListItem index={props.projects.length}>
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
