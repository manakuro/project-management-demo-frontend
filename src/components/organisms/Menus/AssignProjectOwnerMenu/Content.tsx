import React, { memo, useEffect } from 'react'
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from 'src/components/organisms/Menus/ProjectTeammateMenu'
import { SearchMenuLoading } from 'src/components/organisms/Menus/SearchMenu'
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
    </>
  )
})
Content.displayName = 'Content'
