import { useCallback, useEffect } from 'react'
import { useMe, Me } from 'src/store/me'

type Props = {
  lazy?: boolean
}

export const useMeQuery = (props?: Props) => {
  const { setMe } = useMe()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchMe()
      setMe(res)
    })()
  }, [props?.lazy, setMe])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchMe()
      setMe(res)
    })()
  }, [setMe])

  return {
    refetch,
  }
}

const fetchMe = (): Promise<Me> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'Manato Kuroda',
        image: '/images/cat_img.png',
        email: 'manato.kuroda@gmail.com',
      })
    }, 1000)
  })
}
