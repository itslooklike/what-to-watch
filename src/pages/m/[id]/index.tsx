import Link from 'next/link'
import { useRouter } from 'next/router'
import FilmsStore from '../../../store/FilmsStore'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { MovieCardList } from '../../../components/MovieCardList'

MoviePage.getInitialProps = async () => {
  if (FilmsStore.data.length) {
    return {}
  }

  const { data } = await FilmsStore.fetchFilms()

  return {
    initialFilmsStore: data,
  }
}

export default function MoviePage() {
  const router = useRouter()
  const id = router.query.id as string

  const film = FilmsStore.selectFilmById(id)

  if (!film) {
    // FIXME: redirect to 404
    return 404
  }

  return (
    <div>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.background_image} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    {/* <use xlink:href="#play-s"></use> */}
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {/* <use xlink:href="#add"></use> */}
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">
                  Add review
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.poster_image} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item movie-nav__item--active">
                    <Link href={`/m/${id}`}>
                      <a className="movie-nav__link">Overview</a>
                    </Link>
                  </li>
                  <li className="movie-nav__item">
                    <Link href={`/m/${id}/details`}>
                      <a className="movie-nav__link">Details</a>
                    </Link>
                  </li>
                  <li className="movie-nav__item">
                    <Link href={`/m/${id}/reviews`}>
                      <a className="movie-nav__link">Reviews</a>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="movie-rating">
                <div className="movie-rating__score">{film.rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">Very good</span>
                  <span className="movie-rating__count">{film.rating} ratings</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{film.description}</p>

                <p className="movie-card__director">
                  <strong>Director: {film.director}</strong>
                </p>

                <p className="movie-card__starring">
                  <strong>Starring: {film.starring.join(', ')} and other</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
