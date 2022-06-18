import React from 'react'
import dayjs from 'dayjs'
import { styled } from '@linaria/react'

const Root = styled.div`
  position: relative;
  padding-top: 20px;
  padding-right: 75px;
  padding-bottom: 20px;
  color: var(--color-black);
  font-size: 17px;
  line-height: 24px;
  border-bottom: 2px solid var(--color-secondary-light);
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
  color: var(--color-black-opacity);
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
  color: var(--color-grey-dark);
  font-weight: 500;
  font-size: 19px;
  line-height: 25px;
  text-align: center;
  background-color: var(--color-white-opacity);
  border-radius: 8px;
`

type TProps = {
  author: string
  date: Date
  rating: string
}

export const Review: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const { children, author, date, rating } = props

  return (
    <Root>
      <Quote>
        <Text>{children}</Text>
        <Details>
          <Author>{author}</Author>
          <Time>{dayjs(date).format('DD.MM.YYYY HH:mm')}</Time>
        </Details>
      </Quote>
      <Rating>{rating}</Rating>
    </Root>
  )
}
