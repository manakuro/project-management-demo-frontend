import React from 'react'
import { useMenuSelectContext } from '../useMenuSelect'
import { Component } from './Component'

export const MenuSelectList: React.FC = (props) => {
  const { isOpen } = useMenuSelectContext()
  if (!isOpen) return null

  return <Component {...props} />
}
