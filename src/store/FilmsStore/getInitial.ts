import FilmsStore from './FilmsStore'

export const getInitial = async () => {
  if (FilmsStore.data.length) {
    return { initialFilmsStore: null }
  }

  const { data } = await FilmsStore.fetchFilms()

  return { initialFilmsStore: data }
}
