import Head from 'next/head'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { ContentWrap } from '~/design/atoms'
import { FilmPromo, Catalog } from '~/design/organisms'
import { LWithFooter } from '~/design/layouts'
import { getInitialFilms } from '~/store/utils'
import { SeoHead } from '~/design/utils'
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
      <LWithFooter>
        <FilmPromo film={filmsStore.firstFilm} />
        <ContentWrap>
          <Catalog />
        </ContentWrap>
      </LWithFooter>
    </>
  )
}

Home.getInitialProps = getInitialFilms

export default observer(Home)
