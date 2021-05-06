import Head from 'next/head'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'

import { ContentWrap } from '~/design/atoms'
import { MovieCardHeader, Catalog } from '~/design/organisms'
import { BasicWithFooter } from '~/design/layouts'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { useMobxStores } from '~/store'

const Home: NextPage = () => {
  const { filmsStore } = useMobxStores()

  return (
    <>
      <Head>
        <title>What To Watch</title>
      </Head>
      <BasicWithFooter>
        <MovieCardHeader film={filmsStore.firstFilm} />
        <ContentWrap>
          <Catalog />
        </ContentWrap>
      </BasicWithFooter>
    </>
  )
}

Home.getInitialProps = getInitialFilms

export default observer(Home)
