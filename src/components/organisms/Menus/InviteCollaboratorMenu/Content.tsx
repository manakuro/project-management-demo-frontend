import React, { memo } from 'react'
import { Divider, Icon, Text } from 'src/components/atoms'
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from 'src/components/organisms/Menus/ProjectTeammateMenu'
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuRightContainer,
  SearchMenuLoading,
} from 'src/components/organisms/Menus/SearchMenu'
import { PopoverProps } from 'src/components/organisms/Popover'
import { Teammate } from 'src/store/entities/teammate'

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { teammates, loading, onSelectTeammate } = useProjectTeammateMenu(props)

  if (loading) return <SearchMenuLoading />

  return (
    <>
      {teammates.map((t, i) => (
        <ProjectTeammateMenuItem
          key={t.id}
          onClick={onSelectTeammate}
          teammate={t}
          index={i}
        />
      ))}
      <Divider />
      <SearchMenuListItem index={teammates.length}>
        <SearchMenuLeftContainer>
          <Icon icon="userPlus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Invite '${props.queryText}' via email`}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  )
})
Content.displayName = 'Content'
