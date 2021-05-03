import { styled } from 'linaria/react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

const Card = styled.section`
  position: relative;
  z-index: 1;
  color: #eee5b5;
  padding-bottom: 78px;
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
`

export const MovieCardHeader = () => {
  return (
    <Card>
      <CardBg>
        <CardImg src="/img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </CardBg>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <CardWrap>
        <CardInfo>
          <CardPoster>
            <CardPosterImg
              src="/img/the-grand-budapest-hotel-poster.jpg"
              alt="The Grand Budapest Hotel poster"
              width="218"
              height="327"
            />
          </CardPoster>

          <CardDesc>
            <CardTitle>The Grand Budapest Hotel</CardTitle>
            <CardMeta>
              <CardGenre>Drama</CardGenre>
              <span>2014</span>
            </CardMeta>

            <CardButtons>
              <Button>Play</Button>
              <Button>My list</Button>
            </CardButtons>
          </CardDesc>
        </CardInfo>
      </CardWrap>
    </Card>
  )
}
