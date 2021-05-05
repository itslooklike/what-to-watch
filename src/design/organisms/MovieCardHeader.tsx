import Link from 'next/link'
import { styled } from 'linaria/react'

import { Button } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { usePlayerModal } from '~/design/hooks/usePlayerModal'
import type { IFilm } from '~/store/FilmsStore'

const Card = styled.section`
  position: relative;
  z-index: 1;
  padding-bottom: 80px;
  color: #eee5b5;
  background: #e1b0b2;
`

const CardBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;

  ::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    content: '';
  }
`

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  vertical-align: top;
`

const CardWrap = styled.div`
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 75px;
`

const CardInfo = styled.div`
  display: flex;
  align-items: flex-start;
`

const CardPoster = styled.div`
  flex-shrink: 0;
  width: 218px;
  height: 327px;
  margin-right: 40px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
`

const CardPosterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`

const CardDesc = styled.div`
  flex-grow: 1;
`

const CardTitle = styled.h2`
  margin: 0 0 7px;
  font-size: 32px;
  font-family: 'Arial Black', sans-serif;
  line-height: 45px;

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;

    :hover {
      opacity: 0.5;
    }
  }
`

const CardMeta = styled.p`
  display: flex;
  margin: 0 0 20px;
  font-size: 17px;
  line-height: 20px;
`

const CardGenre = styled.span`
  ::after {
    margin-right: 4px;
    margin-left: 4px;
    content: '·';
  }
`

const CardButtons = styled.div`
  display: flex;
  gap: 15px;
`

type TProps = {
  film: IFilm
}

export const MovieCardHeader = (props: TProps) => {
  const { film } = props
  const { handleOpenPlayer, playerModal } = usePlayerModal(film)

  return (
    <Card>
      {playerModal}
      <CardBg>
        <CardImg src={film.background_image} alt={film.name} />
      </CardBg>
      <Header />
      <CardWrap>
        <CardInfo>
          <CardPoster>
            <CardPosterImg
              src={film.poster_image}
              alt={`${film.name} poster`}
              width="218"
              height="327"
            />
          </CardPoster>
          <CardDesc>
            <CardTitle>
              <Link href={`/m/${film.id}`}>
                <a>{film.name}</a>
              </Link>
            </CardTitle>

            <CardMeta>
              <CardGenre>{film.genre}</CardGenre>
              <span>{film.released}</span>
            </CardMeta>
            <CardButtons>
              <Button icon="IconPlay" onClick={handleOpenPlayer}>
                Play
              </Button>
              <Button icon="IconInList">My list</Button>
            </CardButtons>
          </CardDesc>
        </CardInfo>
      </CardWrap>
    </Card>
  )
}
