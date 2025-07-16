import type React from 'react'
import { memo } from 'react'
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from 'src/components/features/organisms/Menus/ProjectTeammateMenu'
import { SearchMenuLoading } from 'src/components/features/organisms/Menus/SearchMenu'
import type { Teammate } from 'src/store/entities/teammate'

type Props = {
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
    </>
  )
})
Content.displayName = 'Content'
