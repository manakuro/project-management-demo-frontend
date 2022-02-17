import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useFavoriteProjectIdsUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { FavoriteProjectIdsUpdatedSubscriptionResponse as Response } from '../type'
import { useFavoriteProjectIdsResponse } from './useFavoriteProjectIdsResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

export const FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useFavoriteProjectIdsUpdatedSubscription = () => {
  const { me } = useMe()
  const { setFavoriteProjectIds } = useFavoriteProjectIdsResponse()

  useSubscription({
    variables: {
      teammateId: me.id,
      requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return

      if (data.subscriptionData.data)
        setBySubscription(data.subscriptionData.data)
      previousData = data
    },
    skip: !me.id,
  })

  const setBySubscription = useRecoilCallback(
    () => (response: Response) => {
      const favoriteProjectIdsUpdated = response.favoriteProjectIdsUpdated

      if (__DEV__) console.log('Favorite Project IDs Updated!: ')

      setFavoriteProjectIds(favoriteProjectIdsUpdated)
    },
    [setFavoriteProjectIds],
  )
}
