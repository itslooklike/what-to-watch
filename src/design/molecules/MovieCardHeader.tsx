import { styled } from 'linaria/react'

import { Button } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { usePlayerModal } from '~/design/organisms'
import type { IFilm } from '~/store/FilmsStore'

const Card = styled.section`
  position: relative;
  z-index: 1;
  color: #eee5b5;
  padding-bottom: 80px;
  background: #e1b0b2;
`

const CardBg = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`

const CardImg = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`

const CardWrap = styled.div`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 75px;
`

const CardInfo = styled.div`
  display: flex;
  align-items: flex-start;
`

const CardPoster = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
  width: 218px;
  height: 327px;
  margin-right: 40px;
  flex-shrink: 0;
`

const CardPosterImg = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CardDesc = styled.div`
  flex-grow: 1;
`

const CardTitle = styled.h2`
  font-family: 'Arial Black', sans-serif;
  font-size: 32px;
  line-height: 45px;
  margin: 0 0 7px;
`

const CardMeta = styled.p`
  margin: 0;
  display: flex;
  font-size: 17px;
  line-height: 20px;
  margin: 0 0 20px;
`

const CardGenre = styled.span`
  ::after {
    content: '·';
    margin-left: 4px;
    margin-right: 4px;
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
            <CardTitle>{film.name}</CardTitle>
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
