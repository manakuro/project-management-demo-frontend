import React, { useCallback } from 'react'
import { Wrap } from 'src/components/atoms'
import { useProjectCommand } from 'src/store/entities/project'
import { useProjectIconIds } from 'src/store/entities/projectIcon'
import { IconPickerItem } from './IconPickerItem'

type Props = {
  projectId: string
  currentProjectIconId: string
  currentProjectLightColorId: string
  currentProjectBaseColorId: string
}

export const IconPicker: React.FC<Props> = (props) => {
  const { projectIconIds } = useProjectIconIds()
  const { setProject } = useProjectCommand()

  const handleClick = useCallback(
    async (id: string) => {
      await setProject({
        projectId: props.projectId,
        projectIconId: id,
      })
    },
    [props.projectId, setProject],
  )

  return (
    <Wrap p={6} spacing={1} overflowY="scroll" maxH={60}>
      {projectIconIds.map((id) => (
        <IconPickerItem
          key={id}
          projectIconId={id}
          currentProjectIconId={props.currentProjectIconId}
          currentProjectBaseColorId={props.currentProjectBaseColorId}
          currentProjectLightColorId={props.currentProjectLightColorId}
          onClick={handleClick}
        />
      ))}
    </Wrap>
  )
}
