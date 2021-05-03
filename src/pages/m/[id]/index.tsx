import { useRouter } from 'next/router'
import FilmsStore, { getInitial } from '../../../store/FilmsStore'
import { FilmLayout } from '../../../components/FilmLayout'
import { FilmOverview } from '../../../components/FilmOverview'

MovieIndex.getInitialProps = getInitial

export default function MovieIndex() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    return 404
  }

  return (
    <FilmLayout film={film}>
      <FilmOverview film={film} />
    </FilmLayout>
  )
}
