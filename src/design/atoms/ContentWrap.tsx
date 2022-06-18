import React from 'react'
import { styled } from '@linaria/react'

const Root = styled.div`
  width: 100%;
  max-width: var(--base-content-width);
  margin-right: auto;
  margin-bottom: 100px;
  margin-left: auto;
  padding: 30px var(--base-content-padding) 0;
`
export const ContentWrap: React.FC<React.PropsWithChildren<unknown>> = (props) => {
  const { children } = props
  return <Root>{children}</Root>
}
