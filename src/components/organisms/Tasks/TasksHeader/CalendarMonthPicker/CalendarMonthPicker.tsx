import React, { memo, useMemo } from 'react'
import {
  IconButton,
  Icon,
  Flex,
  FlexProps,
  Text,
  PortalManager,
  Link,
} from 'src/components/atoms'
import { Popover, PopoverTrigger } from 'src/components/organisms/Popover'
import { useTasksCalendarContext } from 'src/components/organisms/Tasks'
import { useDisclosure } from 'src/shared/chakra'
import { dateFns } from 'src/shared/dateFns'
import { Content } from './Content'

type Props = FlexProps

export const CalendarMonthPicker: React.VFC<Props> = memo<Props>((props) => {
  const { ...rest } = props
  const { currentDate } = useTasksCalendarContext()
  const dateText = useMemo(() => {
    return dateFns.format(currentDate, 'MMMM y')
  }, [currentDate])
  const popoverDisclosure = useDisclosure()

  return (
    <Flex {...rest} alignItems="center">
      <Text fontWeight="medium">{dateText}</Text>
      <PortalManager zIndex={1500}>
        <Popover
          isOpen={popoverDisclosure.isOpen}
          isLazy
          closeOnBlur={false}
          placement="bottom-start"
        >
          <PopoverTrigger>
            <Link onClick={popoverDisclosure.onOpen}>
              <IconButton
                ml={1}
                h={6}
                aria-label="Pick month"
                icon={<Icon icon="chevronDown" color="text.muted" />}
                variant="ghost"
                size="sm"
              />
            </Link>
          </PopoverTrigger>
          {popoverDisclosure.isOpen && (
            <Content onClose={popoverDisclosure.onClose} />
          )}
        </Popover>
      </PortalManager>
    </Flex>
  )
})
CalendarMonthPicker.displayName = 'CalendarMonthPicker'
