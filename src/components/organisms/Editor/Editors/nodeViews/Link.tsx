import { Flex, Icon, Link as AtomsLink } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from '../ReactNodeView'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/organisms'

export const Link: React.FC = (props) => {
  const context = useReactNodeView()

  return (
    <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
      <PopoverTrigger>
        <AtomsLink
          color="cyan.400"
          cursor="pointer"
          _hover={{
            textDecoration: 'underline !important',
          }}
        >
          {props.children}
        </AtomsLink>
      </PopoverTrigger>
      <PopoverContent contentEditable={false}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Flex fontSize="sm" alignItems="center" userSelect="none">
            <Icon icon="linkExternal" color="text.muted" size="sm" />
            <AtomsLink
              href={context.node?.attrs.href}
              ml={3}
              color="cyan.400"
              cursor="pointer"
              _hover={{
                textDecoration: 'underline !important',
              }}
              flex={1}
              isExternal
            >
              {context.node?.attrs.href}
            </AtomsLink>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
