import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms/Flex'
import { Link } from 'src/components/atoms/Link'
import { Icon } from 'src/components/atoms/Icon'

type Props = FlexProps

export const SocialLinks: React.VFC<Props> = (props) => {
  return (
    <Flex {...props}>
      <Link isExternal href="https://twitter.com/manakuroo1" display="flex">
        <Icon icon="twitter" mr={4} />
      </Link>
      <Link isExternal href="https://github.com/manakuro" display="flex">
        <Icon icon="github" mr={4} />
      </Link>
      <Link isExternal href="https://manakuro.medium.com/" display="flex">
        <Icon icon="medium" />
      </Link>
    </Flex>
  )
}
