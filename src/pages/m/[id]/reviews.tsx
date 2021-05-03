import { useRouter } from 'next/router'
import FilmsStore, { getInitial } from '../../../store/FilmsStore'
import { FilmLayout } from '../../../components/FilmLayout'
import { FilmReviews } from '../../../components/FilmReviews'

MoviePageReviews.getInitialProps = getInitial

export default function MoviePageReviews() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    return 404
  }

  return (
    <FilmLayout film={film}>
      <FilmReviews film={film} />
    </FilmLayout>
  )
}
