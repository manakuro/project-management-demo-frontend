import React, { memo, useCallback, useState } from 'react'
import { Icon } from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { Tooltip } from 'src/components/molecules'
import { IconType } from 'src/shared/icons'
import { useDisclosure } from 'src/shared/chakra'
import { Menu, MenuButton } from 'src/components/organisms'
import { MenuList } from './MenuList'
import { ListStatus } from './listState'

type Props = {
  variant: 'unmarked' | 'today' | 'upcoming' | 'later'
  status?: ListStatus
  onOpened?: () => void
  onClosed?: () => void
}

const getVariantData = (
  variant: Props['variant'],
): { label: string; ariaLabel: string; icon: IconType } => {
  switch (variant) {
    case 'unmarked':
      return {
        label: 'Mark this task for Today, Upcoming, or Later',
        ariaLabel: 'A Mark description',
        icon: 'sliderAlt',
      }
    case 'today':
      return {
        label: 'Mark this task for Today, Upcoming, or Later',
        ariaLabel: 'A Mark description',
        icon: 'sliderAlt',
      }
    case 'upcoming':
      return {
        label: 'Mark this task for Today, Upcoming, or Later',
        ariaLabel: 'A Mark description',
        icon: 'sliderAlt',
      }
    case 'later':
      return {
        label: 'Mark this task for Today, Upcoming, or Later',
        ariaLabel: 'A Mark description',
        icon: 'sliderAlt',
      }
  }
}

export const Mark: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHover()
  const data = getVariantData(props.variant)

  const { onOpen, isOpen, onClose } = useDisclosure()
  const [listState, setListState] = useState<ListStatus | undefined>(
    props.status,
  )

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onOpen()
      props.onOpened?.()
    },
    [onOpen, props],
  )
  const handleClose = useCallback(() => {
    onClose()
    props.onClosed?.()
  }, [onClose, props])

  const handleChangeSort = useCallback(
    (status: ListStatus) => {
      setListState(status)
      handleClose()
    },
    [handleClose],
  )

  return (
    <Menu isOpen={isOpen} isLazy placement="bottom-end">
      <Tooltip
        hasArrow
        label={data.label}
        aria-label={data.ariaLabel}
        size="lg"
        withIcon
        display={isOpen ? 'none' : 'block'}
      >
        <MenuButton onClick={handleOpen}>
          <Icon
            icon={data.icon}
            color="text.muted"
            mt="1px"
            {...clickableHoverLightStyle}
          />
        </MenuButton>
      </Tooltip>

      {isOpen && (
        <MenuList
          listStatus={listState}
          onCloseMenu={handleClose}
          onChange={handleChangeSort}
        />
      )}
    </Menu>
  )
})
