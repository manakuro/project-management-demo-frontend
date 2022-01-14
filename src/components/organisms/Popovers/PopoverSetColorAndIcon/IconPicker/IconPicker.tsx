import React from 'react'
import { Wrap } from 'src/components/atoms'
import { useProjectIconIds } from 'src/store/entities/projectIcons'
import { IconPickerItem } from './IconPickerItem'

type Props = {
  currentProjectIconId: string
  currentProjectLightColorId: string
  currentProjectBaseColorId: string
}

export const IconPicker: React.VFC<Props> = (props) => {
  const { projectIconIds } = useProjectIconIds()

  return (
    <Wrap p={6} spacing={1} overflowY="scroll" maxH={60}>
      {projectIconIds.map((id) => (
        <IconPickerItem
          key={id}
          projectIconId={id}
          currentProjectIconId={props.currentProjectIconId}
          currentProjectBaseColorId={props.currentProjectBaseColorId}
          currentProjectLightColorId={props.currentProjectLightColorId}
        />
      ))}
    </Wrap>
  )
}
