import { Flex, Portal } from 'src/components/atoms'
import React from 'react'
import { PopoverBody, PopoverContent } from 'src/components/organisms'

export const PopoverEditorLinkContent: React.FC = (props) => {
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
