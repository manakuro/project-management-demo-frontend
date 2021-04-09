import { ToolbarItem } from './types'
import { toggleMarkUnderline } from 'src/shared/prosemirror/config/commands'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useUnderline = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkUnderline,
      isActive: isMarkActive(schema.marks.underline),
    }),
    [],
  )
}
