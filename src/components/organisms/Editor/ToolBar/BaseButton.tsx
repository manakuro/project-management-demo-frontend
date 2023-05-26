import React, { useCallback } from 'react'
import {
  useEditorStateContext,
  useEditorViewContext,
} from 'src/components/organisms/Editor/Editors'
import { IconButton, IconButtonProps } from 'src/components/ui/atoms'
import { Tooltip, TooltipProps } from 'src/components/ui/molecules'
import { ToolbarItem } from 'src/shared/prosemirror/hooks'

type Props = {
  isActive?: ToolbarItem['isActive']
  isEnable?: ToolbarItem['isEnable']
  action: ToolbarItem['action']
  tooltip: Omit<TooltipProps, 'children'>
} & Omit<IconButtonProps, 'isActive'>

export const BaseButton: React.FC<Props> = (props) => {
  const state = useEditorStateContext()
  const view = useEditorViewContext()
  const { onClick, tooltip, action, isEnable, isActive, ...rest } = props

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!view) return
      e.preventDefault()
      action(state, view.dispatch, view)
    },
    [action, state, view],
  )

  return (
    <Tooltip hasArrow {...tooltip} size="sm" withIcon openDelay={500}>
      <IconButton
        variant="ghost"
        size="sm"
        colorScheme="teal"
        onMouseDown={handleMouseDown}
        {...rest}
        isActive={isActive?.(state) ?? false}
        isDisabled={isEnable?.(state) === false}
        _disabled={{
          cursor: 'pointer',
          opacity: 0.4,
          boxShadow: 'none',
        }}
      />
    </Tooltip>
  )
}
