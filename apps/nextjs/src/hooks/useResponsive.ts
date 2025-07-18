import { useBreakpointValue } from 'src/shared/chakra';

export const useResponsive = () => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' },
  );

  return {
    isMobile,
  };
};
