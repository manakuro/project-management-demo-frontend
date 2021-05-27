import { useToast as useToastChakraUi } from '@chakra-ui/react'

export const useToast = () => {
  const toast = useToastChakraUi()

  return {
    toast,
  }
}
