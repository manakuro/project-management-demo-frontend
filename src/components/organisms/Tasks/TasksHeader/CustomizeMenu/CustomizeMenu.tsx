import React from 'react'
import { Drawer } from 'src/components/organisms/Drawer'
import { Content } from './Content'
import { useCustomizeMenu } from './useCustomizeMenu'

export const CustomizeMenu: React.VFC = () => {
  const { isOpen, onClose } = useCustomizeMenu()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      {isOpen && <Content />}
    </Drawer>
  )
}
