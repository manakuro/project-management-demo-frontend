import React, { memo } from 'react'
import { Flex, Icon, IconButton, Stack, Text } from 'src/components/atoms'
import { useTeammates } from 'src/store/teammates'
import { Teammate } from './Teammate'
import { LeaveTaskButton } from './LeaveTaskButton'

type Props = {}

export const Collaborators: React.FC<Props> = memo(() => {
  const { teammateIds } = useTeammates()

  return (
    <Flex flex={1} mt={4} pl={8} pb={2} alignItems="center">
      <Text fontSize="xs" color="text.muted" fontWeight="medium">
        Collaborators
      </Text>
      <Stack spacing={2} direction="row" alignItems="center" ml={4}>
        {teammateIds.map((t) => (
          <Teammate teammateId={t} key={t} />
        ))}
        <IconButton
          aria-label="add collaborators"
          icon={<Icon icon="plus" color="text.muted" />}
          variant="ghost"
          size="sm"
        />
      </Stack>
      <Flex alignItems="center" ml="auto" mt={1}>
        <LeaveTaskButton />
      </Flex>
    </Flex>
  )
})
Collaborators.displayName = 'Collaborators'
