import Head from 'next/head'
import type { IFilm } from '~/store/FilmsStore'

const site = 'https://what-to-watch-kohl.vercel.app'

type TProps = {
  film?: IFilm
  url: string
}

export const SeoHead = ({ film, url }: TProps) => {
  if (!film) {
    return null
  }

  const image = film.imagePreview?.publicUrl

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={film.name} />
      <meta property="og:description" content={film.description} />
      <meta property="og:url" content={site + url} />
      <meta property="og:image" content={image} />
      <meta property="vk:image" content={image} />
      <meta property="twitter:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
