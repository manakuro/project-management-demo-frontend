import React, { memo, useCallback } from 'react'
import { MenuList as AtomsMenuList, MenuItem } from 'src/components/organisms'

type Props = {
  onSort?: () => void
  onMoveRight?: () => void
  onMoveLeft?: () => void
  onHideColumn?: () => void
}

export const MenuList: React.FC<Props> = memo((props) => {
  const { onSort, onHideColumn, onMoveLeft, onMoveRight } = props
  const handleSortBy = useCallback(() => {
    onSort?.()
  }, [onSort])

  const handleMoveRight = useCallback(() => {
    onMoveRight?.()
  }, [onMoveRight])

  const handleMoveLeft = useCallback(() => {
    onMoveLeft?.()
  }, [onMoveLeft])

  const handleHideColumn = useCallback(() => {
    onHideColumn?.()
  }, [onHideColumn])

  return (
    <AtomsMenuList color="text.base">
      <MenuItem onClick={handleSortBy}>Sort by</MenuItem>
      <MenuItem onClick={handleMoveRight}>Move left</MenuItem>
      <MenuItem onClick={handleMoveLeft}>Move right</MenuItem>
      <MenuItem onClick={handleHideColumn}>Hide column</MenuItem>
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
