import { ToolbarItem } from './types'
import { toggleMarkBold } from 'src/shared/prosemirror/config/commands'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useBold = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkBold,
      isActive: isMarkActive(schema.marks.bold),
    }),
    [],
  )
}
