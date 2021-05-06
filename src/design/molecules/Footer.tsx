import { styled } from 'linaria/react'

import { Logo } from '~/design/atoms'

const Root = styled.footer`
  padding: 20px;
`

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const Copyright = styled.div`
  color: var(--color-grey);
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`

const CopyrightText = styled.p`
  margin: 0;
`

export function Footer() {
  return (
    <Root>
      <LogoWrap>
        <Logo type="light" />
      </LogoWrap>
      <Copyright>
        <CopyrightText>© 2021 What to watch Ltd.</CopyrightText>
      </Copyright>
    </Root>
  )
}
