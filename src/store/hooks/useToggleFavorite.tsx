import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { useMobxStores } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

export const useToggleFavorite = (film: IFilm) => {
  const router = useRouter()

  const { userStore, favoriteStore, filmsStore } = useMobxStores()

  const handleFavorite = useCallback(async () => {
    if (!userStore.user) {
      router.push('/login')
      return
    }

    if (film.is_favorite) {
      await favoriteStore.remove(film.id)
    } else {
      await favoriteStore.add(film.id)
    }

    await filmsStore.fetchFilms()
  }, [userStore.user, film])

  return {
    handleFavorite,
  }
}
