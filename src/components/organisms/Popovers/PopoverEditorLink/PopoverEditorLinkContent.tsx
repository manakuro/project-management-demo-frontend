import React from 'react'
import { PopoverBody, PopoverContent } from 'src/components/organisms/Popover'
import { Flex, Portal } from 'src/components/ui/atoms'

export const PopoverEditorLinkContent: React.FCWithChildren = (props) => {
  return (
    <Portal>
      <PopoverContent contentEditable={false}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Flex fontSize="sm" alignItems="center" userSelect="none">
            {props.children}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
}
