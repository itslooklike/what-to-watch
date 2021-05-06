import type { NextPageContext } from 'next'

import { isServer } from '~/utils/isServer'

export const getInitialFilms = async ({ mobxStores }: NextPageContext) => {
  if (isServer || mobxStores.filmsStore.data.length === 0) {
    await mobxStores.filmsStore.fetchFilms()
  }

  return {}
}
