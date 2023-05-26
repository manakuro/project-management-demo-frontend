import React, { useCallback } from 'react'
import { Wrap } from 'src/components/ui/atoms'
import { useProjectCommand } from 'src/store/entities/project'
import { useProjectBaseColorIds } from 'src/store/entities/projectBaseColor'
import { ColorPickerItem } from './ColorPickerItem'

type Props = {
  currentProjectBaseColorId: string
  projectId: string
}

export const ColorPicker: React.FC<Props> = (props) => {
  const { projectBaseColorIds } = useProjectBaseColorIds()
  const { setProject } = useProjectCommand()

  const handleClick = useCallback(
    async (id: string) => {
      await setProject({
        projectId: props.projectId,
        projectBaseColorId: id,
      })
    },
    [props.projectId, setProject],
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
