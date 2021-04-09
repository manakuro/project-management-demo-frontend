import { ToolbarItem } from './types'
import { liftListItemCommand } from 'src/shared/prosemirror/config/commands'
import { useMemo } from 'react'

export const useDecreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: liftListItemCommand,
      isActive: liftListItemCommand,
    }),
    [],
  )
}
