import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FilmLayout } from '../../../components/FilmLayout'
import { FilmReviews } from '../../../components/FilmReviews'
import { useMobxStores } from '../../../store'

const MoviePageReviews: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  return (
    <FilmLayout film={film}>
      <FilmReviews film={film} />
    </FilmLayout>
  )
}

MoviePageReviews.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default MoviePageReviews
