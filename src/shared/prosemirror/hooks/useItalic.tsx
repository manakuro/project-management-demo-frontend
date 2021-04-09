import { ToolbarItem } from './types'
import { toggleMarkItalic } from 'src/shared/prosemirror/config/commands'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useItalic = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkItalic,
      isActive: isMarkActive(schema.marks.italic),
    }),
    [],
  )
}
