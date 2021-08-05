import { useToast as useToastChakraUi } from '@chakra-ui/react'
import { useCallback } from 'react'
import { Toast, ToastProps } from 'src/components/molecules'

type Props = ToastProps

export const useToast = () => {
  const toastChakraUi = useToastChakraUi()

  const toast = useCallback(
    (props: Props) => {
      const isClosable = props.isClosable ?? true
      const position = props.position ?? 'bottom-left'
      const duration = props.duration ?? 5000

      const toastProps = {
        ...props,
        isClosable,
        position,
        duration,
      }

      return toastChakraUi({
        ...toastProps,
        render: (renderProps) => {
          return <Toast {...toastProps} {...renderProps} />
        },
      })
    },
    [toastChakraUi],
  )

  return {
    toast,
  }
}
