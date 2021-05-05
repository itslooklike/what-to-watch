import type { NextPage } from 'next'

import { PageContent } from '~/design/atoms'
import { Footer } from '~/design/molecules'
import { MovieCardHeader, Catalog } from '~/design/organisms'
import { useMobxStores } from '~/store'

const Home: NextPage = () => {
  const { filmsStore } = useMobxStores()

  return (
    <div>
      <MovieCardHeader film={filmsStore.firstFilm} />
      <PageContent>
        <Catalog />
        <Footer />
      </PageContent>
    </div>
  )
}

Home.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default Home
