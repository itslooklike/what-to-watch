import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { FilmDetails } from '~/design/atoms'
import { FilmLayout } from '~/design/templates'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { SeoHead } from '~/utils/SeoHead'
import { useMobxStores } from '~/store'

const MoviePageDetails: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  return (
    <>
      <Head>
        <title>WTW - {film.name}</title>
      </Head>
      <SeoHead film={filmsStore.firstFilm} url={router.asPath} />
      <FilmLayout film={film}>
        <FilmDetails film={film} />
      </FilmLayout>
    </>
  )
}

MoviePageDetails.getInitialProps = getInitialFilms

export default MoviePageDetails
