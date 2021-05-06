import Head from 'next/head'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { ContentWrap } from '~/design/atoms'
import { MovieCardHeader, Catalog } from '~/design/organisms'
import { BasicWithFooter } from '~/design/layouts'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { SeoHead } from '~/utils/SeoHead'
import { useMobxStores } from '~/store'

const Home: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>What To Watch - Have a Good Time!</title>
      </Head>
      <SeoHead film={filmsStore.firstFilm} url={router.asPath} />
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
