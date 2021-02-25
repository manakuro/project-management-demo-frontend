import React, { useCallback } from 'react'
import { Box, Button, Flex, Text } from 'src/components/atoms'
import {
  PADDING_X,
  Item,
} from 'src/components/organisms/Navigation/Help/Body/GuideListItem'
import { useDisclosure } from '@chakra-ui/react'

type Props = {
  item: Item
  onToggle: (id: number) => void
  seeMoreComponent: React.ReactNode
  nextItem?: Item
}

export const Detail: React.VFC<Props> = (props) => {
  const { item, onToggle, nextItem, seeMoreComponent } = props
  const disclosure = useDisclosure()

  const handleContinue = useCallback(() => {
    onToggle(nextItem!.id)
  }, [nextItem, onToggle])

  if (item.detailComponent)
    return (
      <Flex p={PADDING_X} flexDirection="column">
        {item.detailComponent}
      </Flex>
    )

  return (
    <Flex p={PADDING_X} flexDirection="column">
      {disclosure.isOpen ? (
        <>
          {seeMoreComponent}
          {nextItem && (
            <>
              <Text fontSize="sm" fontWeight="bold" mt={3}>
                Up next:{' '}
                <Text as="span" fontSize="sm">
                  {nextItem?.title}
                </Text>
              </Text>
              <Button
                fontSize="sm"
                colorScheme="teal"
                w="full"
                onClick={handleContinue}
                mt={3}
              >
                Continue
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Text fontSize="sm" isTruncated noOfLines={3}>
            {item.description}
          </Text>
          <Box>
            <Text
              as="span"
              fontSize="xs"
              color="link"
              cursor="pointer"
              _hover={{
                textDecoration: 'underline !important',
              }}
              onClick={disclosure.onOpen}
            >
              See more
            </Text>
          </Box>
          <Text fontSize="xs" color="text.muted" mt={2} textAlign="right">
            {item.time}
          </Text>
        </>
      )}
    </Flex>
  )
}
