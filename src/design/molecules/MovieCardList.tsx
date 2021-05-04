import Link from 'next/link'
import { styled } from 'linaria/react'

import { SmallMovieCard } from '~/design/atoms'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 20px;
`

type TProps = {
  films: IFilm[]
}

export function MovieCardList(props: TProps) {
  const { films } = props

  return (
    <Root>
      {films.map((film, idx) => {
        return (
          <div key={idx}>
            <Link href={`/m/${film.id}`} passHref>
              <SmallMovieCard film={film} />
            </Link>
          </div>
        )
      })}
    </Root>
  )
}