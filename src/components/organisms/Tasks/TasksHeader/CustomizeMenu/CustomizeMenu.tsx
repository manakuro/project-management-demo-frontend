import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from 'src/components/organisms'
import { useCustomizeMenu } from './useCustomizeMenu'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Flex, Heading, Icon, IconButton, Stack } from 'src/components/atoms'
import { CustomField } from 'src/components/molecules'

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
        <IconButton
          aria-label="Close button"
          icon={<Icon icon="arrowToRight" />}
          position="absolute"
          top="1.25rem"
          right={3}
          variant="ghost"
          onClick={onClose}
        />
        <DrawerHeader fontSize="md" py={6} px={4}>
          Customize
        </DrawerHeader>
        <Divider />

        <Flex flexDirection="column" h="full" overflowY="scroll">
          <DrawerBody flex={1} display="flex" flexDirection="column" px={4}>
            <Heading as="h4" size="xs">
              Fields
            </Heading>
            <Stack spacing={4} mt={2}>
              <CustomField label="Due date" />
              <CustomField label="Projects" />
              <CustomField label="Tags" />
            </Stack>
          </DrawerBody>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
