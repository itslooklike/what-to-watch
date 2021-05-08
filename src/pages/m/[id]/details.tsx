import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { Details } from '~/design/atoms'
import { FilmTemplate } from '~/design/templates'
import { getInitialFilms } from '~/store/utils'
import { SeoHead } from '~/design/utils'
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
      <FilmTemplate film={film}>
        <Details film={film} />
      </FilmTemplate>
    </>
  )
}

MoviePageDetails.getInitialProps = getInitialFilms

export default MoviePageDetails
