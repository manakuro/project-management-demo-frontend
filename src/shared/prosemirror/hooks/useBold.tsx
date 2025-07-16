import { useMemo } from 'react'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { toggleMarkBold } from 'src/shared/prosemirror/config/commands'
import type { ToolbarItem } from './types'

export const useBold = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkBold,
      isActive: isMarkActive(schema.marks.bold),
    }),
    [],
  )
}
