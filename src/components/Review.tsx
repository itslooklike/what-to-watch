import { styled } from 'linaria/react'
import React from 'react'

const Root = styled.div`
  border-bottom: 2px solid #e8c3c4;
  font-size: 17px;
  color: #252525;
  line-height: 24px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 75px;
  position: relative;
`

const Quote = styled.blockquote`
  margin: 0;
  font-size: 17px;
  line-height: 24px;
`

const Text = styled.p`
  margin: 0;
  margin-bottom: 15px;
`

const Details = styled.footer`
  display: flex;
  font-size: 16px;
  line-height: 27px;
  color: rgba(0, 0, 0, 0.4);
`

const Author = styled.cite`
  font-style: normal;
  font-weight: bold;
`

const Time = styled.time`
  flex-shrink: 0;

  ::before {
    content: '·';
    margin-left: 4px;
    margin-right: 4px;
  }
`

const Rating = styled.div`
  position: absolute;
  right: 0;
  top: 22px;
  background: rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  width: 55px;
  text-align: center;
  font-size: 19px;
  color: #353535;
  font-weight: 500;
  line-height: 25px;
  padding: 5px;
`

type TProps = {
  author: string
  date: string
  humanDate: string
  rating: string
}

export const Review: React.FC<TProps> = (props) => {
  const { children, author, humanDate, date, rating } = props

  return (
    <Root>
      <Quote>
        <Text>{children}</Text>
        <Details>
          <Author>{author}</Author>
          <Time dateTime={date}>{humanDate}</Time>
        </Details>
      </Quote>
      <Rating>{rating}</Rating>
    </Root>
  )
}
