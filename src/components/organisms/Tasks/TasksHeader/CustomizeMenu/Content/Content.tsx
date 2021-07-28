import React, { memo, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Box, Flex, Heading, Icon, IconButton } from 'src/components/atoms'
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from 'src/components/organisms'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { useTaskColumnCustomizableContext } from 'src/components/organisms/Tasks/TasksProvider/useTaskColumnCustomizableContext'
import { useDnd } from 'src/hooks/dnd/useDnd'
import { useCustomizeMenu } from '../useCustomizeMenu'
import { ListItem } from './ListItem'

const HEADER_HEIGHT = 72
const TASKS_HEADER_HEIGHT = 60
const TOP = HEADER_HEIGHT + TASKS_HEADER_HEIGHT

export const Content: React.VFC = memo(() => {
  const { onClose } = useCustomizeMenu()
  const { taskColumnIds, setOrderTaskColumn } =
    useTaskColumnCustomizableContext()
  const { list, handleDnd } = useDnd(taskColumnIds)

  useEffect(() => {
    setOrderTaskColumn(list)
  }, [list, setOrderTaskColumn])

  return (
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
              <DrawerBody flex={1} display="flex" flexDirection="column" px={4}>
                <Heading as="h4" size="xs">
                  Fields
                </Heading>
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  mt={2}
                >
                  {list.map((id, i) => (
                    <ListItem taskColumnId={id} key={id} index={i} />
                  ))}
                  {provided.placeholder}
                </Box>
              </DrawerBody>
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </DrawerContent>
  )
})
Content.displayName = 'Content'
