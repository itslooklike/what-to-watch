import Head from 'next/head'
import { useState, SyntheticEvent } from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { Input } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { BasicWithFooter } from '~/design/layouts'
import { useMobxStores } from '~/store'

const Content = styled.div`
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
  color: var(--color-primary-dark);
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
  color: var(--color-primary-dark);
  font-size: 22px;
  line-height: 26px;
  text-align: center;
`

const InputsWrap = styled.div`
  display: grid;
  gap: 10px;
`

const Login: NextPage = () => {
  const [emptyError, setEmptyError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userStore, filmsStore } = useMobxStores()
  const router = useRouter()

  const handleInput = () => {
    if (emptyError) {
      setEmptyError('')
    }
  }

  const handleEmail = (value: string) => {
    handleInput()
    setEmail(value)
  }

  const handlePassword = (value: string) => {
    handleInput()
    setPassword(value)
  }

  const handleSubmit = async (event?: SyntheticEvent) => {
    event?.preventDefault()

    if (!email || !password) {
      setEmptyError('Please fill fields')
      return
    }

    await userStore.submit({ email, password })

    if (!userStore.getError) {
      await filmsStore.fetchFilms()
      router.push('/')
    }
  }

  let count = 0

  // FIXME: потом убрать это
  const devLogin = async () => {
    count += 1
    console.log('count', count)
    if (count === 3) {
      await userStore.submit({ email: '22@22.ru', password: '2' })
      await filmsStore.fetchFilms()
      router.push('/')
    }
  }

  return (
    <>
      <Head>
        <title>WTW - Login</title>
      </Head>
      <BasicWithFooter>
        <Header title={<span onClick={devLogin}>Sign in</span>} centerTitle hideUser />
        <Content>
          <form onSubmit={handleSubmit}>
            <ErrorTitle>
              {userStore.getError
                ? 'Please enter a valid email address'
                : emptyError || <>&nbsp;</>}
            </ErrorTitle>
            <InputsWrap>
              <Input
                onChange={handleEmail}
                type="email"
                placeholder="Email address"
                id="user-email"
                isError={Boolean(userStore.getError || emptyError)}
              />
              <Input
                onChange={handlePassword}
                type="password"
                placeholder="Password"
                id="user-password"
                isError={Boolean(emptyError)}
              />
            </InputsWrap>
            <ButtonWrap>
              <LoginButton type="submit">Sign in</LoginButton>
            </ButtonWrap>
          </form>
        </Content>
      </BasicWithFooter>
    </>
  )
}

export default observer(Login)
