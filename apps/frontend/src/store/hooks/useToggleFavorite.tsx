import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { useMobxStores } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

export const useToggleFavorite = (film: IFilm) => {
  const router = useRouter()

  const { userStore, favoriteStore } = useMobxStores()

  const isFilmFav = favoriteStore.data.find((favFilm) => favFilm.id === film.id)

  const handleFavorite = useCallback(async () => {
    if (!userStore.user) {
      router.push('/login')
      return
    }

    if (isFilmFav) {
      await favoriteStore.remove(film.id)
    } else {
      await favoriteStore.add(film.id)
    }
  }, [userStore.user, film, isFilmFav])

  return {
    handleFavorite,
    loadingUpdate: favoriteStore.loadingUpdate,
    isFilmFav,
  }
}
