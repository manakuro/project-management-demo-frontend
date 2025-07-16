import type React from 'react'
import { memo, useCallback } from 'react'
import type { ButtonProps, IconProps } from 'src/components/ui/atoms'
import { DatePickerWithInput } from 'src/components/ui/molecules'
import { useProject, useProjectCommand } from 'src/store/entities/project'

type Props = {
  projectId: string
  buttonStyle?: ButtonProps
  iconStyle?: Omit<IconProps, 'icon'>
}

export const ProjectDueDate: React.FC<Props> = memo<Props>((props) => {
  const { projectId, buttonStyle, iconStyle } = props
  const { project } = useProject(projectId)
  const { setProject } = useProjectCommand()

  const handleSelect = useCallback(
    async (val: Date) => {
      await setProject({ dueDate: val.toISOString(), projectId })
    },
    [projectId, setProject],
  )

  const handleDelete = useCallback(async () => {
    await setProject({ dueDate: '', projectId })
  }, [projectId, setProject])

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
