import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { useProject } from 'src/store/entities/projects'
import { Input } from './Input'

type Props = {
  projectId: string
}

export const DescriptionTitle: React.FC<Props> = memo<Props>((props) => {
  const { project, setProject } = useProject(props.projectId)

  const handleChange = useCallback(
    async (val: string) => {
      await setProject({ descriptionTitle: val })
    },
    [setProject],
  )

  return (
    <Flex>
      <Input value={project.descriptionTitle} onChange={handleChange} />
    </Flex>
  )
})
DescriptionTitle.displayName = 'DescriptionTitle'
