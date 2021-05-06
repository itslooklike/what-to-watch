import Head from 'next/head'
import type { IFilm } from '~/store/FilmsStore'

const site = 'https://what-to-watch-kohl.vercel.app'

type TProps = {
  film: IFilm
  url: string
}

export const SeoHead = ({ film, url }: TProps) => (
  <Head>
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:title" content={film.name} />
    <meta property="og:description" content="Watch movies" />
    <meta property="og:url" content={site + url} />
    <meta property="og:image" content={film.poster_image} />
    <meta property="vk:image" content={film.poster_image} />
    <meta property="twitter:image" content={film.poster_image} />
  </Head>
)
