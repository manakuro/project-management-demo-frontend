import React, { memo, useCallback, useEffect } from 'react'
import {
  ProjectTeammateMenuItem,
  ProjectTeammateMenuLoading,
  useProjectTeammateMenu,
} from 'src/components/organisms/Menus/ProjectTeammateMenu'
import { useProjectTeammateMenuOnKeyBindings } from 'src/components/organisms/Menus/ProjectTeammateMenu/useProjectTeammateMenuOnKeyBindings'
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
  const { teammates, loading, fetchTeammates } = useProjectTeammateMenu({
    queryText,
  })

  const handleSelect = useCallback(
    (val: Teammate) => {
      onSelect(val)
      onClose()
      onClosed?.()
    },
    [onClose, onClosed, onSelect],
  )

  useProjectTeammateMenuOnKeyBindings({
    items: teammates,
    onSetValue: handleSelect,
  })

  useEffect(() => {
    fetchTeammates('')
  }, [fetchTeammates])

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
    </>
  )
})
Content.displayName = 'Content'
