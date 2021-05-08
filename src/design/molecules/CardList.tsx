import Link from 'next/link'
import { styled } from 'linaria/react'

import { Card } from '~/design/atoms'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`

type TProps = {
  films: IFilm[]
}

export function CardList(props: TProps) {
  const { films } = props

  return (
    <Root>
      {films.map((film, idx) => (
        <Link href={`/m/${film.id}`} key={idx} passHref>
          <Card film={film} />
        </Link>
      ))}
    </Root>
  )
}
