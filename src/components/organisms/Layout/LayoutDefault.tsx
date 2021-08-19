import React, { memo, useEffect } from 'react'
import { Flex } from 'src/components/atoms'
import { PageLoader } from 'src/components/molecules'
import { Navigation } from 'src/components/organisms'
import { useGlobalUILoading } from 'src/store/app/globalUI/loading'

export const LayoutDefault: React.FC = memo((props) => {
  const { loading, endLoading } = useGlobalUILoading()
  console.log('LayoutDefault!')

  // Authenticate user here
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        endLoading()
      }, 500)
    }

    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  if (loading) return <PageLoader />

  return (
    <Flex
      w="full"
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      overflow="hidden"
      {...props}
    >
      <Navigation />
      <Flex flex="1" flexDirection="column" minW="920px">
        <Flex
          as="main"
          flex="1 1 auto"
          flexDirection="column"
          overflowY="scroll"
        >
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
})
LayoutDefault.displayName = 'LayoutDefault'
