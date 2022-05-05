import { ToastId } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react'
import { ToastProps } from 'src/components/molecules'

type Props = ToastProps

let toastIdRef: ToastId | undefined

export const useStandaloneToast = () => {
  const toastChakraUi = createStandaloneToast()

  const toast = (props: Props) => {
    const isClosable = props.isClosable ?? true
    const position = props.position ?? 'bottom-left'
    const duration = props.duration ?? 5000

    const toastProps = {
      ...props,
      isClosable,
      position,
      duration,
    }

    toastIdRef = toastChakraUi({
      ...toastProps,
    })

    return toastIdRef
  }

  return {
    toast,
  }
}
