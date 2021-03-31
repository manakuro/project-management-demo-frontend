import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from 'src/components/organisms'
import { useCustomizeMenu } from './useCustomizeMenu'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Box, Flex, Heading, Icon, IconButton } from 'src/components/atoms'
import { CustomField } from 'src/components/molecules'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal'
import { useDnd } from 'src/hooks/dnd/useDnd'

const HEADER_HEIGHT = 72
const TASKS_HEADER_HEIGHT = 60
const TOP = HEADER_HEIGHT + TASKS_HEADER_HEIGHT

const CUSTOM_FIELDS = [
  {
    name: 'Due date',
  },
  {
    name: 'Projects',
  },
  {
    name: 'Tags',
  },
] as const

export const CustomizeMenu: React.VFC = () => {
  const { isOpen, onClose } = useCustomizeMenu()
  const { list, handleDnd } = useDnd(CUSTOM_FIELDS)
  const renderDraggable = useDraggableInPortal()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent
        flex={1}
        top={`${TOP}px !important`}
        borderTop="1px"
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

        <DragDropContext onDragEnd={handleDnd}>
          <Droppable droppableId="id">
            {(provided) => (
              <Flex flexDirection="column" h="full">
                <DrawerBody
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  px={4}
                >
                  <Heading as="h4" size="xs">
                    Fields
                  </Heading>
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    mt={2}
                  >
                    {list.map((l, i) => (
                      <Draggable key={l.name} draggableId={l.name} index={i}>
                        {renderDraggable((provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            mb={3}
                          >
                            <CustomField label={l.name} />
                          </Box>
                        ))}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                </DrawerBody>
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </DrawerContent>
    </Drawer>
  )
}
