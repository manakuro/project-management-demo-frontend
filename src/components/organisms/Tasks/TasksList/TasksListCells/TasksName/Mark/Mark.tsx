import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { useClickableHover, useMenuOption } from 'src/hooks'
import { Tooltip } from 'src/components/molecules'
import { IconType } from 'src/shared/icons'
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
  const { isOpen, onChange, onClose, onOpen, listState } = useMenuOption({
    status: props.status,
    onOpened: props.onOpened,
    onClosed: props.onClosed,
  })

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
        <MenuButton onClick={onOpen}>
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
          onCloseMenu={onClose}
          onChange={onChange}
        />
      )}
    </Menu>
  )
})
