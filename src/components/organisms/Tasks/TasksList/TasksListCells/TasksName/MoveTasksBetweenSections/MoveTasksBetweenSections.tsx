import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { MenuSelect, MenuSelectButton } from 'src/components/organisms/Menus'
import { useClickableHoverStyle } from 'src/hooks'
import { useTask } from 'src/store/entities/tasks'
import { MenuList } from './MenuList'

type Props = {
  taskId: string
  onOpened?: () => void
  onClosed?: () => void
}

export const MoveTasksBetweenSections: React.FC<Props> = memo<Props>(
  (props) => {
    const { clickableHoverLightStyle } = useClickableHoverStyle()
    const { setTask } = useTask(props.taskId)

    const handleChange = useCallback(
      async (taskSectionId: string) => {
        await setTask({ taskSectionId })
      },
      [setTask],
    )

    return (
      <MenuSelect<string>
        onChange={handleChange}
        onClosed={props.onClosed}
        onOpened={props.onOpened}
        placement="bottom-end"
      >
        {({ isOpen }) => (
          <>
            <Tooltip
              hasArrow
              label="Move tasks between sections"
              aria-label="Move tasks between sections"
              size="md"
              withIcon
              display={isOpen ? 'none' : 'block'}
            >
              <MenuSelectButton>
                <Icon
                  icon="moveVertical"
                  color="text.muted"
                  mt="1px"
                  {...clickableHoverLightStyle}
                />
              </MenuSelectButton>
            </Tooltip>
            {isOpen && <MenuList taskId={props.taskId} />}
          </>
        )}
      </MenuSelect>
    )
  },
)
MoveTasksBetweenSections.displayName = 'Mark'
