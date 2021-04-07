import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { Tooltip } from 'src/components/molecules'
import { IconType } from 'src/shared/icons'
import {
  MenuButton,
  MenuItemOption,
  MenuSelect,
  MenuSelectList,
} from 'src/components/organisms'
import { LATER, ListStatus, TODAY, UPCOMING } from './listState'

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

  const handleChange = useCallback((listStatus: ListStatus) => {
    console.log('hey: ', listStatus)
  }, [])

  return (
    <MenuSelect<ListStatus>
      listStatus={props.status}
      onChange={handleChange}
      onClosed={props.onClosed}
      onOpened={props.onOpened}
    >
      {({ isOpen, onOpen, listStatus, onChange, onClose }) => (
        <>
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
          <MenuSelectList
            isOpen={isOpen}
            listStatus={listStatus}
            onCloseMenu={onClose}
            onChange={onChange}
          >
            <MenuItemOption value={TODAY}>Mark for Today</MenuItemOption>
            <MenuItemOption value={UPCOMING}>Mark for Upcoming</MenuItemOption>
            <MenuItemOption value={LATER}>Mark for Later</MenuItemOption>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  )
})
