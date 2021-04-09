import { ToolbarItem } from './types'
import { setListTypeOrdered } from 'src/shared/prosemirror/config/commands'
import { isBlockActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useOrderedList = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: setListTypeOrdered,
      isActive: isBlockActive(schema.nodes.list, { type: 'ordered' }),
    }),
    [],
  )
}
