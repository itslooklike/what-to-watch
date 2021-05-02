import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MovieCardList } from '../components/MovieCardList'
import FilmsStore, { TGenre } from '../store/FilmsStore'

const Home = observer(() => {
  const { query } = useRouter()

  const genre = query.genre as TGenre

  return (
    <div>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className={`catalog__genres-item${genre ? '' : ' catalog__genres-item--active'}`}>
              <Link href="/">
                <a className="catalog__genres-link">All genres</a>
              </Link>
            </li>
            {FilmsStore.filmGenres.map((genreItem, idx) => {
              return (
                <li
                  key={idx}
                  className={`catalog__genres-item${
                    genre === genreItem ? ' catalog__genres-item--active' : ''
                  }`}
                >
                  <Link href={`/?genre=${genreItem}`}>
                    <a className="catalog__genres-link">{genreItem}</a>
                  </Link>
                </li>
              )
            })}
          </ul>

          <MovieCardList films={FilmsStore.selectFilmsByGenre(genre)} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">
              Show more
            </button>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  )
})

export async function getServerSideProps() {
  const { data } = await FilmsStore.fetchFilms()

  return {
    props: {
      initialFilmsStore: data,
    },
  }
}

export default Home
