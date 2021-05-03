import { useState, useEffect } from 'react'
import FilmsStore, { TGenre } from '../store/FilmsStore'

const PAG_SIZE = 8

export const useFilmsPagination = (genre: TGenre) => {
  const films = FilmsStore.selectFilmsByGenre(genre).slice(0, PAG_SIZE)
  const [currentFilms, setCurrentFilms] = useState(films)

  useEffect(() => {
    if (films !== currentFilms) {
      setCurrentFilms(films)
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
