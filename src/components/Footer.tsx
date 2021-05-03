import { styled } from 'linaria/react'
import { Logo } from './Logo'

const Copyright = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: #54503e;
`

const CopyrightText = styled.p`
  margin: 0;
`

export function Footer() {
  return (
    <footer>
      <Logo />
      <Copyright>
        <CopyrightText>© 2021 What to watch Ltd.</CopyrightText>
      </Copyright>
    </footer>
  )
}
