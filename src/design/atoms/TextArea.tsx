import { styled } from 'linaria/react'

import { Spinner } from '~/icons'

const Root = styled.div`
  background-color: var(--color-secondary-light);
  border-radius: 8px;
`

const Area = styled.textarea`
  display: block;
  width: 100%;
  height: 150px;
  min-height: 150px;
  padding: 25px;
  color: var(--color-black);
  font-size: 17px;
  line-height: 24px;
  background: 0 0;
  border: 0;
  resize: vertical;
`

const Footer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`

const SpinnerWrap = styled.div`
  position: absolute;
  right: 25px;
  bottom: calc(100% + 5px);
  width: 20px;
  height: 20px;
`

const SubmitButton = styled.button`
  display: block;
  padding: 0;
  color: var(--color-grey-light);
  font-weight: 700;
  font-size: 17px;
  line-height: 27px;
  letter-spacing: 0;
  background: 0 0;
  border: 0;
  cursor: pointer;
  transition: opacity 0.2s;
`

type TProps = {
  name: string
  value: string
  placeholder?: string
  loading?: boolean
  onChange: (_: string) => void
}

export const TextArea = (props: TProps) => {
  const { name, placeholder, onChange, loading, value } = props

  return (
    <Root>
      <Area
        readOnly={loading}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(evt) => {
          onChange(evt.target.value)
        }}
      />
      <Footer>
        {loading && (
          <SpinnerWrap>
            <Spinner />
          </SpinnerWrap>
        )}
        <SubmitButton disabled={loading} type="submit">
          Post
        </SubmitButton>
      </Footer>
    </Root>
  )
}
