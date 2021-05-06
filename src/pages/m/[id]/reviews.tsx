import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FilmReviews } from '~/design/molecules'
import { FilmLayout } from '~/design/templates'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { useMobxStores } from '~/store'

const MoviePageReviews: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  return (
    <FilmLayout film={film}>
      <FilmReviews />
    </FilmLayout>
  )
}

MoviePageReviews.getInitialProps = getInitialFilms

export default MoviePageReviews
