import React from 'react'
import { useMenuSelectContext } from '../useMenuSelect'
import { Component, ComponentProps } from './Component'

type Props = ComponentProps

export const MenuSelectList: React.FC<Props> = (props) => {
  const { isOpen } = useMenuSelectContext()
  if (!isOpen) return null

  return <Component {...props} />
}
