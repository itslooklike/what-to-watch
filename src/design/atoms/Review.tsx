import React from 'react'
import { styled } from 'linaria/react'

const Root = styled.div`
  position: relative;
  padding-top: 20px;
  padding-right: 75px;
  padding-bottom: 20px;
  color: #252525;
  font-size: 17px;
  line-height: 24px;
  border-bottom: 2px solid #e8c3c4;
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
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  line-height: 27px;
`

const Author = styled.cite`
  font-weight: bold;
  font-style: normal;
`

const Time = styled.time`
  flex-shrink: 0;

  ::before {
    margin-right: 4px;
    margin-left: 4px;
    content: '·';
  }
`

const Rating = styled.div`
  position: absolute;
  top: 22px;
  right: 0;
  width: 55px;
  padding: 5px;
  color: #353535;
  font-weight: 500;
  font-size: 19px;
  line-height: 25px;
  text-align: center;
  background: rgba(255, 255, 255, 0.24);
  border-radius: 8px;
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
