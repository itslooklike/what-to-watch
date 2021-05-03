import { useRouter } from 'next/router'
import FilmsStore from '../../../store/FilmsStore'
import { Footer } from '../../../components/Footer'
import { MovieCardList } from '../../../components/MovieCardList'
import { FilmCard } from '../../../components/FilmCard'
import { FilmDetails } from '../../../components/FilmDetails'

MoviePageDetails.getInitialProps = async () => {
  if (FilmsStore.data.length) {
    return {}
  }

  const { data } = await FilmsStore.fetchFilms()

  return {
    initialFilmsStore: data,
  }
}

export default function MoviePageDetails() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    // FIXME: redirect to 404
    return 404
  }

  return (
    <div>
      <FilmCard film={film} content={<FilmDetails film={film} />} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <MovieCardList films={FilmsStore.selectLikeThis(film)} />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
