import { styled } from 'linaria/react'

import { Logo } from '~/design/atoms'

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

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
      <LogoWrap>
        <Logo type="light" />
      </LogoWrap>
      <Copyright>
        <CopyrightText>© 2021 What to watch Ltd.</CopyrightText>
      </Copyright>
    </footer>
  )
}
