import React, { memo, useCallback } from 'react'
import { Divider, Icon, Text } from 'src/components/atoms'
import {
  ProjectTeammateMenuItem,
  ProjectTeammateMenuLeftContainer,
  ProjectTeammateMenuListItem,
  ProjectTeammateMenuLoading,
  ProjectTeammateMenuRightContainer,
  useProjectTeammateMenu,
} from 'src/components/organisms/Menus/ProjectTeammateMenu'
import { PopoverProps } from 'src/components/organisms/Popover'
import { Teammate } from 'src/store/entities/teammates'

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, queryText, onSelect, onClose } = props
  const { teammates, loading } = useProjectTeammateMenu({ queryText })

  const handleSelect = useCallback(
    (val: Teammate) => {
      onSelect(val)
      onClose()
      onClosed?.()
    },
    [onClose, onClosed, onSelect],
  )

  if (loading) return <ProjectTeammateMenuLoading />

  return (
    <>
      {teammates.map((t, i) => (
        <ProjectTeammateMenuItem
          key={t.id}
          onClick={handleSelect}
          teammate={t}
          index={i}
        />
      ))}
      <Divider />
      <ProjectTeammateMenuListItem index={teammates.length}>
        <ProjectTeammateMenuLeftContainer>
          <Icon icon="userPlus" color="primary" />
        </ProjectTeammateMenuLeftContainer>
        <ProjectTeammateMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Invite '${props.queryText}' via email`}
          </Text>
        </ProjectTeammateMenuRightContainer>
      </ProjectTeammateMenuListItem>
    </>
  )
})
Content.displayName = 'Content'
