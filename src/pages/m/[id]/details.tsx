import { useRouter } from 'next/router'
import FilmsStore, { getInitial } from '../../../store/FilmsStore'
import { FilmLayout } from '../../../components/FilmLayout'
import { FilmDetails } from '../../../components/FilmDetails'

MoviePageDetails.getInitialProps = getInitial

export default function MoviePageDetails() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    return 404
  }

  return (
    <FilmLayout film={film}>
      <FilmDetails film={film} />
    </FilmLayout>
  )
}
