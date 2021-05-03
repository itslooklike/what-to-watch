import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MovieCardList } from '../components/MovieCardList'
import { Footer } from '../components/Footer'
import { MovieCardHeader } from '../components/MovieCardHeader'
import FilmsStore, { TGenre } from '../store/FilmsStore'

Home.getInitialProps = async () => {
  if (FilmsStore.data.length) {
    return {}
  }

  const { data } = await FilmsStore.fetchFilms()

  return {
    initialFilmsStore: data,
  }
}

function Home() {
  const { query } = useRouter()

  const genre = query.genre as TGenre

  return (
    <div>
      <MovieCardHeader />

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

        <Footer />
      </div>
    </div>
  )
}

export default observer(Home)
