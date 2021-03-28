import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from 'src/components/organisms'
import { useCustomizeMenu } from './useCustomizeMenu'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Flex } from 'src/components/atoms'

const HEADER_HEIGHT = 72
const TASKS_HEADER_HEIGHT = 60
const TOP = HEADER_HEIGHT + TASKS_HEADER_HEIGHT

export const CustomizeMenu: React.VFC = () => {
  const { isOpen, onClose } = useCustomizeMenu()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent
        flex={1}
        top={`${TOP}px !important`}
        borderLeft="1px"
        borderColor="gray.200"
        boxShadow="none"
      >
        <DrawerCloseButton top="1.25rem" />
        <DrawerHeader fontSize="md" py={6} px={4}>
          Customize
        </DrawerHeader>
        <Divider />

        <Flex flexDirection="column" h="full" overflowY="scroll">
          <DrawerBody flex={1} display="flex" flexDirection="column" p={0}>
            hey
          </DrawerBody>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
