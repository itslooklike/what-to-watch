import type { NextPageContext } from 'next'

export const getInitialFavorite = async ({ mobxStores }: NextPageContext) => {
  await mobxStores.favoriteStore.fetchFavorite()
  return {}
}
