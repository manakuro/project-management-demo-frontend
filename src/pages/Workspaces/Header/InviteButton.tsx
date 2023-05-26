import React, { memo, useCallback } from 'react'
import { Tooltip } from 'src/components/molecules'
import { useInviteModal } from 'src/components/organisms/Modals'
import { Button, Flex, FlexProps, Icon } from 'src/components/ui/atoms'

type Props = FlexProps

export const InviteButton: React.FC<Props> = memo<Props>((props) => {
  const { setIsOpen } = useInviteModal()

  const handleClick = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <Flex alignItems="center" {...props}>
      <Tooltip
        hasArrow
        label="Manage team members"
        aria-label="A invite button description"
        openDelay={500}
      >
        <Button
          leftIcon={<Icon icon="userPlus" mt="1px" size="xs" />}
          variant="outline"
          size="xs"
          onClick={handleClick}
        >
          Invite
        </Button>
      </Tooltip>
    </Flex>
  )
})
InviteButton.displayName = 'InviteButton'
