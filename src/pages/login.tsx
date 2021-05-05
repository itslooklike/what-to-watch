import { useState, SyntheticEvent } from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { Logo, Input } from '~/design/atoms'
import { Footer } from '~/design/molecules'
import { useMobxStores } from '~/store'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 15px 15px 70px;
  background-image: linear-gradient(-180deg, #170202 0%, #0c0101 100%);
`

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding: 22px 75px;
`

const Title = styled.h1`
  position: absolute;
  right: 200px;
  left: 200px;
  margin: 0 auto;
  color: #dfcf77;
  font-weight: 300;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 165px;
`

const LoginButton = styled.button`
  display: block;
  width: 100%;
  padding: 24px 40px;
  color: #d9cd8d;
  font-size: 30px;
  line-height: 44px;
  text-align: center;
  background: 0 0;
  border: 1px solid rgba(217, 205, 141, 0.41);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
`
const ButtonWrap = styled.div`
  margin-top: 20px;
`

const ErrorTitle = styled.p`
  margin-bottom: 40px;
  color: #dfcf77;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
`

const InputsWrap = styled.div`
  display: grid;
  gap: 10px;
`

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userStore } = useMobxStores()
  const router = useRouter()

  const handleEmail = (value: string) => {
    setEmail(value)
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (!email || !password) {
      console.log('ошибка')
    }

    await userStore.submit({ email, password })

    if (!userStore.getError) {
      router.push('/')
    }
  }

  return (
    <Root>
      <Header>
        <Logo />
        <Title>Sign in</Title>
      </Header>
      <Content>
        <form onSubmit={handleSubmit}>
          {userStore.getError && <ErrorTitle>Please enter a valid email address</ErrorTitle>}
          <InputsWrap>
            <Input
              onChange={handleEmail}
              type="email"
              placeholder="Email address"
              id="user-email"
              isError={Boolean(userStore.getError)}
            />
            <Input
              onChange={handlePassword}
              type="password"
              placeholder="Password"
              id="user-password"
            />
          </InputsWrap>
          <ButtonWrap>
            <LoginButton type="submit">Sign in</LoginButton>
          </ButtonWrap>
        </form>
      </Content>
      <Footer />
    </Root>
  )
}

export default observer(Login)
