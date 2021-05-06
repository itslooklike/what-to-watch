import React from 'react'
import { styled } from 'linaria/react'

const Root = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-bottom: 100px;
  margin-left: auto;
  padding: 30px 75px 0;
`
export const ContentWrap: React.FC = (props) => {
  const { children } = props
  return <Root>{children}</Root>
}
