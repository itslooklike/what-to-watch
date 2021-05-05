import { styled } from 'linaria/react'

const Root = styled.div`
  padding-bottom: 15px 15px 70px;
  color: #c9b37e;
  background-image: linear-gradient(-180deg, #180202 0%, #000000 100%);
`

export const PageContent: React.FC = ({ children }) => <Root>{children}</Root>
