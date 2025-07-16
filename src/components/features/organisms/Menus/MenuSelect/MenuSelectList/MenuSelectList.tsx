import type React from 'react'
import { useMenuSelectContext } from '../useMenuSelect'
import { Component, type ComponentProps } from './Component'

type Props = ComponentProps

export const MenuSelectList: React.FC<Props> = (props) => {
  const { isOpen } = useMenuSelectContext()
  if (!isOpen) return null

  return <Component {...props} />
}
