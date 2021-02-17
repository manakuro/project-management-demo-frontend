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
import { Body } from './Body'
import { Flex } from 'src/components/atoms'

const PADDING_X = 4
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
        <DrawerCloseButton top="1.25rem" />
        <DrawerHeader fontSize="md" py={6} px={PADDING_X}>
          Getting started guide
        </DrawerHeader>
        <Divider />

        <Flex flexDirection="column" h="full" overflowY="scroll">
          <DrawerBody p={PADDING_X} flex={1}>
            <Body />
          </DrawerBody>

          <DrawerFooter p={0}>
            <Footer />
          </DrawerFooter>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
