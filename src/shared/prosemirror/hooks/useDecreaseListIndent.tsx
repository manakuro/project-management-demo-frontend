import { useMemo } from 'react'
import { liftListItemCommand } from 'src/shared/prosemirror/config/commands'
import { ToolbarItem } from './types'

export const useDecreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: liftListItemCommand,
      isEnable: liftListItemCommand,
    }),
    [],
  )
}
