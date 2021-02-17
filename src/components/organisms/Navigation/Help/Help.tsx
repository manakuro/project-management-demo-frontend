import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from 'src/components/organisms'
import { useHelp } from './useHelp'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Footer } from './Footer'

export const Help: React.VFC = () => {
  const { isOpen, onClose } = useHelp()

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      isFullHeight
      colorScheme="gray"
    >
      <DrawerContent bg="gray.700" color="white">
        <DrawerCloseButton top="1rem" />
        <DrawerHeader>Getting started guide</DrawerHeader>
        <Divider />

        <DrawerBody p={6}>body</DrawerBody>

        <DrawerFooter p={0}>
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
