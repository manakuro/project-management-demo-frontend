import { keyframes } from '@chakra-ui/react';
import type React from 'react';
import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';

type Props = FlexProps & {
  isTransitioning: boolean;
};

const shimmer = keyframes({
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const TasksNameTransition: React.FC<Props> = memo<Props>((props) => {
  const bgGradient = useMemo<FlexProps>(() => {
    if (props.isTransitioning)
      return {
        visibility: 'visible',
        opacity: 1,
        transition: 'opacity .25s;',
        _after: {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          transform: 'translateX(-100%)',
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))',
          animation: `${shimmer} 2s`,
          animationIterationCount: 1,
        },
      };
    return {};
  }, [props.isTransitioning]);

  return (
    <Flex
      position="absolute"
      left={0}
      top={0}
      w="full"
      h="calc(100% - 2px)"
      mt="1px"
      mb="1px"
      bg="inherit"
      visibility="hidden"
      opacity={0}
      bgGradient="linear(to-r, teal.50, teal.100, teal.200, teal.200, teal.100, teal.50)"
      transition="visibility 0s .25s, opacity .25s linear"
      pointerEvents="none"
      overflow="hidden"
      {...bgGradient}
    />
  );
});
TasksNameTransition.displayName = 'TasksNameTransition';
