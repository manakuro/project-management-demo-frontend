import React from 'react'
import { Avatar, Flex, Icon, IconButton, Stack } from 'src/components/atoms'
import { InputWithIcon } from 'src/components/molecules'

export const MainHeader: React.FC = (props) => {
  return (
    <Flex w="full" h="72px" px={6} borderBottom="1px" borderColor="gray.200">
      <Flex flex="1 1 auto" flexDirection="column" justifyContent="center">
        {props.children}
      </Flex>
      <Flex flex="0 0 auto" w="330px">
        <Stack
          w="full"
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <InputWithIcon
            icon="search"
            placeholder="Search"
            borderRadius="full"
            size="sm"
          />
          <IconButton
            aria-label="Add tasks"
            borderRadius="full"
            size="sm"
            icon={<Icon icon="listPlus" />}
          />
          <Avatar
            name="Manato Kuroda"
            src="/images/cat_img.png"
            size="sm"
            cursor="pointer"
            bg="teal.200"
          />
        </Stack>
      </Flex>
    </Flex>
  )
}
