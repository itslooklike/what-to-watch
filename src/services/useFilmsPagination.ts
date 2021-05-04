import { useState, useEffect } from 'react'
import { TGenre } from '../store/FilmsStore'
import { useMobxStores } from '../store'

const PAG_SIZE = 8

export const useFilmsPagination = (genre: TGenre) => {
  const { filmsStore } = useMobxStores()
  const films = filmsStore.selectFilmsByGenre(genre)
  const [currentFilms, setCurrentFilms] = useState(films.slice(0, PAG_SIZE))

  useEffect(() => {
    if (films !== currentFilms) {
      setCurrentFilms(films.slice(0, PAG_SIZE))
    }
  }, [genre])

  const handleMore = () => {
    setCurrentFilms((prev) => {
      const nextFilms = films.slice(prev.length, prev.length + PAG_SIZE)
      return prev.concat(nextFilms)
    })
  }

  const isHasMore = currentFilms.length < films.length

  return [currentFilms, handleMore, isHasMore] as const
}
