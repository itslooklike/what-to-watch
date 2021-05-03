import { useRouter } from 'next/router'
import FilmsStore, { getInitial } from '../../../store/FilmsStore'
import { FilmDetails } from '../../../components/FilmDetails'
import { FilmLayout } from '../../../components/FilmLayout'

MoviePageDetails.getInitialProps = getInitial

export default function MoviePageDetails() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    // FIXME: redirect to 404
    return 404
  }

  return (
    <FilmLayout film={film}>
      <FilmDetails film={film} />
    </FilmLayout>
  )
}
