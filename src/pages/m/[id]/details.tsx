import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FilmDetails } from '~/design/atoms'
import { FilmLayout } from '~/design/templates'
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
    <FilmLayout film={film}>
      <FilmDetails film={film} />
    </FilmLayout>
  )
}

MoviePageDetails.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default MoviePageDetails
