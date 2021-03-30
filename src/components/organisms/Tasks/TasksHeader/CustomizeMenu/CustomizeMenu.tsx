import React, { useState } from 'react'
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
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal'

const HEADER_HEIGHT = 72
const TASKS_HEADER_HEIGHT = 60
const TOP = HEADER_HEIGHT + TASKS_HEADER_HEIGHT

const sort = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const arr = Array.from(list)
  const [deleted] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, deleted)

  return arr
}

const list = [
  {
    name: 'Due date',
  },
  {
    name: 'Projects',
  },
  {
    name: 'Tags',
  },
]

export const CustomizeMenu: React.VFC = () => {
  const { isOpen, onClose } = useCustomizeMenu()
  const [field, setField] = useState(list)
  const renderDraggable = useDraggableInPortal()

  const handleDnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return
    }

    const sorted = sort(field, result.source.index, result.destination.index)
    setField(sorted)
  }

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
                    {field.map((t, i) => (
                      <Draggable key={t.name} draggableId={t.name} index={i}>
                        {renderDraggable((provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            mb={3}
                          >
                            <CustomField label={t.name} />
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
