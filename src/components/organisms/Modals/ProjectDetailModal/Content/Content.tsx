import React, { memo, useCallback } from 'react'
import { Divider, Flex, Stack } from 'src/components/atoms'
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from 'src/components/organisms/Modal'
import { useProject } from 'src/store/entities/projects'
import { Description } from './Description'
import { Label } from './Label'
import { NameField } from './NameField'
import { ProjectOwner } from './ProjectOwner'

type Props = {
  projectId: string
}

export const Content: React.VFC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project, setProjectName } = useProject(projectId)

  const handleChangeName = useCallback(
    async (val: string) => {
      if (!val) return
      await setProjectName(val)
    },
    [setProjectName],
  )

  return (
    <ModalContent>
      <ModalHeader>Project details</ModalHeader>
      <ModalCloseButton />
      <Divider />
      <ModalBody py={4}>
        <Stack spacing={6}>
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <Label>Name</Label>
              <NameField value={project.name} onChange={handleChangeName} />
            </Flex>
            <Flex mt={4}>
              <ProjectOwner projectId={projectId} />
            </Flex>
          </Flex>
          <Divider />
          <Description />
        </Stack>
      </ModalBody>
    </ModalContent>
  )
})
Content.displayName = 'Content'
