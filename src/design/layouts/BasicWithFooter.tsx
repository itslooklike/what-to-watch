import React from 'react'
import { styled } from 'linaria/react'

import { Footer } from '~/design/molecules'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
`

export const BasicWithFooter: React.FC = (props) => {
  const { children } = props

  return (
    <Root>
      <Content>{children}</Content>
      <Footer />
    </Root>
  )
}
