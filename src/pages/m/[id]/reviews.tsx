import Head from 'next/head'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'

import { FilmReviews } from '~/design/molecules'
import { FilmTemplate } from '~/design/templates'
import { getInitialFilmsWithComments } from '~/store/utils/getInitialFilmsWithComments'
import { SeoHead } from '~/utils/SeoHead'
import { useMobxStores } from '~/store'

const MoviePageReviews: NextPage = () => {
  const { filmsStore, commentsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)
  const comments = commentsStore.getComment(+id)

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
        <FilmReviews comments={comments} />
      </FilmTemplate>
    </>
  )
}

MoviePageReviews.getInitialProps = getInitialFilmsWithComments

export default observer(MoviePageReviews)
