import React from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { SearchInput } from './SearchInput'
import { AddButton } from './AddButton'
import { MyAccountAvatar } from './MyAccountAvatar'
import { useMainStyle } from 'src/hooks'

export const MainHeader: React.FC = (props) => {
  const { paddingX } = useMainStyle()

  return (
    <Flex
      w="full"
      h="72px"
      px={paddingX}
      borderBottom="1px"
      borderColor="gray.200"
    >
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
          <SearchInput />
          <AddButton />
          <MyAccountAvatar />
        </Stack>
      </Flex>
    </Flex>
  )
}
