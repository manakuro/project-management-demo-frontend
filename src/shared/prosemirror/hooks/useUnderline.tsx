import { useMemo } from 'react'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { toggleMarkUnderline } from 'src/shared/prosemirror/config/commands'
import type { ToolbarItem } from './types'

export const useUnderline = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkUnderline,
      isActive: isMarkActive(schema.marks.underline),
    }),
    [],
  )
}
