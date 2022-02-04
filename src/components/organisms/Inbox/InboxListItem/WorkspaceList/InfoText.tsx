import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useWorkspaceListTaskIds } from 'src/components/organisms/Inbox'
import { useCreatedByIdsByTaskIds } from 'src/store/entities/task'
import { useTeammateNamesByTeammateIds } from 'src/store/entities/teammate'

type Props = FlexProps & {
  workspaceListId: string
}

export const InfoText: React.FC<Props> = memo<Props>((props) => {
  const { workspaceListId } = props
  const { taskIds } = useWorkspaceListTaskIds(workspaceListId)
  const { createdByIds } = useCreatedByIdsByTaskIds(taskIds)
  const { teammateNames } = useTeammateNamesByTeammateIds(createdByIds)
  const text = useMemo(() => {
    const names =
      teammateNames.length > 2
        ? [...teammateNames.slice(0, 2), 'others']
        : teammateNames

    return `${names.join(' and ')} added new tasks`
  }, [teammateNames])

  return (
    <Flex flex={1} mt={2} fontSize="xs" fontWeight="medium">
      {text}
    </Flex>
  )
})

InfoText.displayName = 'InfoText'
