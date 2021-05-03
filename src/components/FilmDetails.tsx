import React from 'react'
import { styled } from 'linaria/react'
import { IFilm } from '../store/FilmsStore'

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 35px;
`

const Col = styled.div`
  width: 155px;
`

const Item = styled.p`
  font-size: 19px;
  line-height: 30px;
`

const ItemName = styled.strong`
  display: block;
  color: #252525;
  font-weight: bold;
`
const ItemValue = styled.span`
  color: #131313;
`

type TProps = {
  film: IFilm
}

// FIXME: время переформатировать
export const FilmDetails = (props: TProps) => {
  const { film } = props

  return (
    <Root>
      <Col>
        <Item>
          <ItemName>Director</ItemName>
          <ItemValue>{film.director}</ItemValue>
        </Item>
        <Item>
          <ItemName>Starring</ItemName>
          <ItemValue>{film.starring.join(', ')}</ItemValue>
        </Item>
      </Col>
      <Col>
        <Item>
          <ItemName>Run Time</ItemName>
          <ItemValue>{film.run_time}</ItemValue>
        </Item>
        <Item>
          <ItemName>Genre</ItemName>
          <ItemValue>{film.genre}</ItemValue>
        </Item>
        <Item>
          <ItemName>Released</ItemName>
          <ItemValue>{film.released}</ItemValue>
        </Item>
      </Col>
    </Root>
  )
}