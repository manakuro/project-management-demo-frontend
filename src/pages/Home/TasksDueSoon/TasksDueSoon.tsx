import React, { memo } from 'react'
import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms'
import { useClickableHover } from 'src/hooks'

type Props = {}

export const TasksDueSoon: React.VFC<Props> = memo<Props>((props) => {
  const { clickableHoverStyle, clickableHoverLightStyle } = useClickableHover()

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              p={2}
              borderBottom="1px"
              borderColor="gray.200"
              _hover={{ bg: 'none' }}
            >
              {isExpanded ? (
                <Icon icon="chevronDown" mt="1px" />
              ) : (
                <Icon icon="chevronRight" mt="1px" />
              )}
              <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                Task Due Soon
              </Heading>
            </AccordionButton>
            <AccordionPanel p={0}>
              <Box py={4}>
                <Stack spacing={3}>
                  <Flex
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    px={4}
                    py={2}
                    h={10}
                    {...clickableHoverStyle}
                  >
                    <Flex alignItems="center" flex={1}>
                      <Icon
                        icon="checkCircle"
                        color="gray.500"
                        {...clickableHoverLightStyle}
                      />
                      <Text fontSize="sm" ml={2} isTruncated>
                        Implement home page
                      </Text>
                    </Flex>
                    <Flex
                      w="200px"
                      flex="0 0 auto"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Badge variant="solid">Asana</Badge>
                      <Text
                        w={14}
                        ml={2}
                        fontSize="xs"
                        color="text.muted"
                        textAlign="right"
                      >
                        Today
                      </Text>
                    </Flex>
                  </Flex>
                </Stack>
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
})
