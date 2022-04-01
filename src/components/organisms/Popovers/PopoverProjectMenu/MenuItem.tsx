import React from 'react'
import {
  MenuItem as AtomsMenuItem,
  MenuItemProps,
} from 'src/components/organisms/Menu'

export const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={3} {...props} />
)
