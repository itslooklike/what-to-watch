import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FilmLayout } from '../../../components/FilmLayout'
import { FilmOverview } from '../../../components/FilmOverview'
import { useMobxStores } from '../../../store'

const MovieIndex: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  return (
    <FilmLayout film={film}>
      <FilmOverview film={film} />
    </FilmLayout>
  )
}

MovieIndex.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default MovieIndex
