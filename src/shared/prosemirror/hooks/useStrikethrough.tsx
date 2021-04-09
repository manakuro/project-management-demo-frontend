import { ToolbarItem } from './types'
import { toggleMarkStrikethrough } from 'src/shared/prosemirror/config/commands'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useStrikethrough = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkStrikethrough,
      isActive: isMarkActive(schema.marks.strikethrough),
    }),
    [],
  )
}
