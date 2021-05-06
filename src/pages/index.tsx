import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'

import { PageContent } from '~/design/atoms'
import { Footer } from '~/design/molecules'
import { MovieCardHeader, Catalog } from '~/design/organisms'
import { getInitialFilms } from '~/utils/getInitialFilms'
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

Home.getInitialProps = getInitialFilms

export default observer(Home)
