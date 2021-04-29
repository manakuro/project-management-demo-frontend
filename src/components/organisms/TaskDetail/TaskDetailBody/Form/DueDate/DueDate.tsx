import React, { memo } from 'react'
import { Row, Label, Content } from '../Row'
import { Button, Icon, Text, Box } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { formatDueDate } from 'src/shared/date'

type Props = {
  dueDate: string
  dueTime: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { ref, isHovering } = useHover()

  return (
    <Row>
      <Label>Due date</Label>
      <Content>
        <PopoverDueDatePicker
          date={props.dueDate}
          time={props.dueTime}
          onChange={(date) => console.log(date)}
        >
          <Button
            as={Box}
            variant="ghost"
            size="sm"
            ref={ref}
            border="1px"
            borderColor="transparent"
            cursor="pointer"
          >
            <Icon icon="calendar" color="text.muted" size="xl" />
            <Text ml={2} fontSize="sm">
              {formatDueDate(props.dueDate)}
            </Text>
            <Icon
              ml={2}
              mt="1px"
              icon="x"
              color="text.muted"
              size="sm"
              visibility={isHovering ? 'visible' : 'hidden'}
              {...clickableHoverLightStyle}
              onClick={(e) => {
                e.stopPropagation()
                console.log('click!')
              }}
            />
          </Button>
        </PopoverDueDatePicker>
      </Content>
    </Row>
  )
})
