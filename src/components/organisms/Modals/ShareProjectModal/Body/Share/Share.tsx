import React, { memo, useCallback, useMemo, useState } from 'react'
import { AvatarGroup, Flex, Input, Text } from 'src/components/atoms'
import { ProjectTeammateMenu } from 'src/components/organisms/Menus'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useLinkStyle } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { useTeammate } from 'src/store/entities/teammates'
import { BodyHeader } from '../BodyHeader'
import { BodyStack } from '../BodyStack'

type Props = {
  projectId: string
  loading: boolean
  onSetMembersTab: () => void
}

export const Share: React.VFC<Props> = memo<Props>((props) => {
  const { projectId, onSetMembersTab } = props
  const popoverDisclosure = useDisclosure()
  const [value, setValue] = useState<string>('')
  const { teammateIds } = useTeammateIdsByProjectId(projectId)
  const { teammate: firstTeammate } = useTeammate(teammateIds[0])
  const teammateText = useMemo(() => {
    const teammatesNames =
      teammateIds.length > 2
        ? [firstTeammate.name, `${teammateIds.length} others`]
        : [firstTeammate.name]

    return teammatesNames.join(' and ')
  }, [firstTeammate.name, teammateIds.length])
  const { style } = useLinkStyle()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)
      if (val) {
        popoverDisclosure.onOpen()
        return
      }
      popoverDisclosure.onClose()
    },
    [popoverDisclosure],
  )

  const handleSelect = useCallback((val: string) => {
    console.log(val)
  }, [])

  return (
    <BodyStack flex={1}>
      <BodyHeader>Invite with email</BodyHeader>
      <ProjectTeammateMenu
        isOpen={popoverDisclosure.isOpen}
        onClose={popoverDisclosure.onClose}
        onSelect={handleSelect}
        placement="bottom-start"
        queryText={value}
      >
        <Flex>
          <Input
            autoFocus
            placeholder="Add project members by name or email..."
            fontSize="sm"
            color="text.base"
            value={value}
            onChange={handleChange}
          />
        </Flex>
      </ProjectTeammateMenu>
      <Flex alignItems="center">
        <AvatarGroup size="xs" max={3} spacing={1} fontSize="xs">
          {teammateIds.map((id) => (
            <TeammateAvatar teammateId={id} key={id} />
          ))}
        </AvatarGroup>
        <Text ml={2} mt={1} fontWeight="medium" fontSize="xs">
          {teammateText}
        </Text>

        <Text
          ml="auto"
          mt={1}
          {...style}
          fontWeight="medium"
          fontSize="xs"
          onClick={onSetMembersTab}
        >
          View all members
        </Text>
      </Flex>
    </BodyStack>
  )
})
Share.displayName = 'Share'
