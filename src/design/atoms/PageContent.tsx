import { styled } from 'linaria/react'

const Root = styled.div`
  background-image: linear-gradient(-180deg, #180202 0%, #000000 100%);
  color: #c9b37e;
  padding: 15px;
  padding-bottom: 70px;
`

export const PageContent: React.FC = ({ children }) => <Root>{children}</Root>
