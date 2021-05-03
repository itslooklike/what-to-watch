import { useRouter } from 'next/router'
import FilmsStore, { getInitial } from '../../../store/FilmsStore'
import { FilmReviews } from '../../../components/FilmReviews'
import { FilmLayout } from '../../../components/FilmLayout'

MoviePageReviews.getInitialProps = getInitial

export default function MoviePageReviews() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    // FIXME: redirect to 404
    return 404
  }

  return (
    <FilmLayout film={film}>
      <FilmReviews film={film} />
    </FilmLayout>
  )
}
