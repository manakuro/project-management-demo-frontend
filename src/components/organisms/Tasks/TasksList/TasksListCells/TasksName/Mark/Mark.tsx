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

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleChangeSort = useCallback(
    (status: ListStatus) => {
      setListState(status)
      onClose()
    },
    [onClose],
  )

  return (
    <Menu isOpen={isOpen} isLazy placement="bottom-end">
      <MenuButton onClick={handleOpen}>
        <Tooltip
          hasArrow
          label={data.label}
          aria-label={data.ariaLabel}
          size="lg"
          withIcon
        >
          <Icon
            icon={data.icon}
            color="text.muted"
            mt="1px"
            {...clickableHoverLightStyle}
          />
        </Tooltip>
      </MenuButton>
      {isOpen && (
        <MenuList
          listStatus={listState}
          onCloseMenu={onClose}
          onChange={handleChangeSort}
        />
      )}
    </Menu>
  )
})
