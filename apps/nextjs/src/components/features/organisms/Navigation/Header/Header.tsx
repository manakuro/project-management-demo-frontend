import {
  PADDING_X,
  useNavigation,
} from '@/components/features/organisms/Navigation';
import {
  Flex,
  Icon,
  IconButton,
  Link,
  Logo,
  NextLink,
} from '@/components/ui/atoms';
import { ROUTE_HOME } from '@/router';
import { memo } from 'react';

export const Header = memo(function Header() {
  const { isExpanded, toggleMenu } = useNavigation();

  return (
    <Flex
      w="full"
      h="72px"
      minH="72px"
      alignItems="center"
      px={PADDING_X}
      justifyContent="flex-end"
      ml={isExpanded ? 0 : '-3px'}
    >
      {isExpanded && (
        <NextLink href={ROUTE_HOME.href.pathname()} passHref legacyBehavior>
          <Link mr="auto">
            <Logo />
          </Link>
        </NextLink>
      )}
      <IconButton
        mr={-2}
        onClick={toggleMenu}
        aria-label="expand button"
        icon={<Icon icon="menu" />}
        variant="ghost"
        light
      />
    </Flex>
  );
});
