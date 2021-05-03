import FilmsStore, { IFilm } from '../store/FilmsStore'
import { FilmCard } from '../components/FilmCard'
import { MovieCardList } from '../components/MovieCardList'
import { Footer } from '../components/Footer'

type TProps = {
  film: IFilm
}

export const FilmLayout: React.FC<TProps> = (props) => {
  const { children, film } = props

  return (
    <div>
      <FilmCard film={film} content={children} />

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
