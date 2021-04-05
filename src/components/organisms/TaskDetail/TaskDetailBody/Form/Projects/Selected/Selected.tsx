import React from 'react'
import { Box, Button, Icon, Stack } from 'src/components/atoms'
import { ProjectButton } from './ProjectButton'
import { AddToProject } from './AddtoProject'
import { Section } from './Section'

type Props = {}

export const Selected: React.FC<Props> = (props) => {
  return (
    <Stack spacing={1} direction="row" display="flex" alignItems="center">
      <ProjectButton />
      <Section />
      <Button as={Box} variant="ghost" size="xs" cursor="pointer">
        <Icon icon="x" color="text.muted" />
      </Button>
      <AddToProject />
    </Stack>
  )
}
