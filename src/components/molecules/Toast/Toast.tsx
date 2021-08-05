import { UseToastOptions as UseToastOptionsChakra } from '@chakra-ui/react'
import { RenderProps } from '@chakra-ui/toast/dist/types/toast.types'
import React from 'react'
import { Button, Flex, Icon, IconButton } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

export type ToastProps = UseToastOptionsChakra & {
  undo?: () => void
}
type Props = ToastProps & RenderProps

export const Toast: React.FC<Props> & { id?: string } = forwardRef<
  Props,
  'div'
>((props, ref) => {
  return (
    <Flex
      ref={ref}
      p={4}
      borderRadius="md"
      borderTop="8px"
      borderColor="teal.400"
      borderStyle="solid"
      bg="white"
      fontSize="sm"
      w="256px"
      minH="100px"
      boxShadow="md"
      flexDirection="column"
      aria-label="toast-content"
    >
      <Flex>
        {props.description}
        {props.isClosable && (
          <IconButton
            icon={<Icon icon="x" color="text.muted" />}
            aria-label="close toast"
            variant="ghost"
            onClick={props.onClose}
            ml={2}
          />
        )}
      </Flex>
      {props.undo && (
        <Flex justifyContent="flex-end">
          <Button
            variant="outline"
            onClick={props.undo}
            fontSize="sm"
            size="sm"
          >
            Undo
          </Button>
        </Flex>
      )}
    </Flex>
  )
})

Toast.id = 'Toast'
