import React, { memo, useCallback } from 'react'
import { ButtonProps, IconProps } from 'src/components/atoms'
import { DatePickerWithInput } from 'src/components/molecules'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
  buttonStyle?: ButtonProps
  iconStyle?: Omit<IconProps, 'icon'>
}

export const ProjectDueDate: React.FC<Props> = memo<Props>((props) => {
  const { projectId, buttonStyle, iconStyle } = props
  const { setProject, project } = useProject(projectId)

  const handleSelect = useCallback(
    async (val: Date) => {
      await setProject({ dueDate: val.toISOString() })
    },
    [setProject],
  )

  const handleDelete = useCallback(async () => {
    await setProject({ dueDate: '' })
  }, [setProject])

  return (
    <DatePickerWithInput
      onSelect={handleSelect}
      onDelete={handleDelete}
      dueDate={project.dueDate}
      buttonStyle={buttonStyle}
      iconStyle={iconStyle}
    />
  )
})
ProjectDueDate.displayName = 'ProjectDueDate'
