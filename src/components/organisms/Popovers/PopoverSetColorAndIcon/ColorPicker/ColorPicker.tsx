import React, { useCallback } from 'react'
import { Wrap } from 'src/components/atoms'
import { useProjectBaseColorIds } from 'src/store/entities/projectBaseColors'
import { useProject } from 'src/store/entities/projects'
import { ColorPickerItem } from './ColorPickerItem'

type Props = {
  currentProjectBaseColorId: string
  projectId: string
}

export const ColorPicker: React.VFC<Props> = (props) => {
  const { projectBaseColorIds } = useProjectBaseColorIds()
  const { setColor } = useProject(props.projectId)

  const handleClick = useCallback(
    async (id: string) => {
      await setColor(props.projectId, id)
    },
    [props.projectId, setColor],
  )

  return (
    <Wrap p={6} spacing={1}>
      {projectBaseColorIds.map((id) => (
        <ColorPickerItem
          key={id}
          projectBaseColorId={id}
          currentProjectBaseColorId={props.currentProjectBaseColorId}
          onClick={handleClick}
        />
      ))}
    </Wrap>
  )
}
