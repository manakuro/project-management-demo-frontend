import React, { memo, useEffect, useMemo } from 'react'
import { Divider, Icon, Text } from 'src/components/atoms'
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from 'src/components/organisms/Menus/ProjectTeammateMenu'
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
} from 'src/components/organisms/Menus/SearchMenu'
import { Teammate } from 'src/store/entities/teammate'

type Props = {
  onSelect: (val: Teammate) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { teammates, loading, fetchTeammates, onSelectTeammate } =
    useProjectTeammateMenu(props)
  const text = useMemo(() => {
    if (props.queryText) return `Invite '${props.queryText}' via email`

    return 'Invite teammates via email'
  }, [props.queryText])

  useEffect(() => {
    fetchTeammates('')
  }, [fetchTeammates])

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
          <Icon icon="plus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {text}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  )
})
Content.displayName = 'Content'
