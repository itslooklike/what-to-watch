import type { NextPageContext } from 'next'

import { isServer } from '~/utils/env'

export const getInitialFilmsWithComments = async ({ mobxStores, query }: NextPageContext) => {
  const promises: Promise<void>[] = []

  const filmId = query.id as string

  if (isServer || mobxStores.filmsStore.data.length === 0) {
    const promise = mobxStores.filmsStore.fetchFilms()
    promises.push(promise)
  }

  if (isServer || filmId) {
    const promise = mobxStores.commentsStore.fetchComments(filmId)
    promises.push(promise)
  }

  await Promise.all(promises)

  return {}
}
