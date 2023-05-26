import React, { memo, useCallback, useMemo } from 'react'
import { useShareProjectModal } from 'src/components/features/organisms/Modals'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { Flex, Heading, Icon, Text } from 'src/components/ui/atoms'
import { useLinkStyle } from 'src/hooks'
import { formatCreatedAt } from 'src/shared/date'
import { useMe } from 'src/store/entities/me'
import { useProjectTeammate } from 'src/store/entities/projectTeammate'
import { useTeammate } from 'src/store/entities/teammate'
import { useTimelineStyle } from '../useTimelineStyle'

type Props = {
  projectId: string
  projectTeammateId: string
}

export const JoinedTeammate: React.FC<Props> = memo<Props>((props) => {
  const { projectTeammateId, projectId } = props
  const { projectTeammate } = useProjectTeammate(projectTeammateId)
  const { teammate } = useTeammate(projectTeammate.teammateId)
  const { me } = useMe()
  const name = useMemo(() => {
    if (me.id === teammate.id) return 'You'
    return teammate.name
  }, [me.id, teammate.id, teammate.name])
  const { timelineBorderStyle } = useTimelineStyle()
  const { styleHover: linkStyle } = useLinkStyle()
  const { setProjectId, setMembersTab, onOpen } = useShareProjectModal()

  const handleClick = useCallback(() => {
    setProjectId(projectId)
    setMembersTab()
    onOpen()
  }, [setProjectId, projectId, setMembersTab, onOpen])

  return (
    <Flex position="relative">
      <Flex flexDirection="column">
        <Icon icon="group" color="text.muted" size="xl" />
        <Flex
          flex={1}
          minW="1px"
          position="relative"
          _before={{
            ...timelineBorderStyle._before,
            borderStyle: 'solid',
            borderColor: 'gray.300',
            h: 'full',
          }}
        />
      </Flex>
      <Flex flexDirection="column" ml={2} mb={8}>
        <Heading as="h5" size="sm" {...linkStyle} onClick={handleClick}>
          {name} joined
        </Heading>
        <Text fontSize="xs" color="text.muted">
          {formatCreatedAt(projectTeammate.createdAt)}
        </Text>
        <TeammateAvatar mt={2} teammateId={teammate.id} size="xs" />
      </Flex>
    </Flex>
  )
})
JoinedTeammate.displayName = 'JoinedTeammate'
