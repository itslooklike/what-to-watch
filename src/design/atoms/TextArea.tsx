import { styled } from 'linaria/react'

const Root = styled.div`
  background: #e8c3c4;
  border-radius: 8px;
`

const Area = styled.textarea`
  display: block;
  width: 100%;
  height: 150px;
  min-height: 150px;
  padding: 25px;
  color: #252525;
  font-size: 17px;
  line-height: 24px;
  background: 0 0;
  border: 0;
  resize: vertical;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`

const SubmitButton = styled.button`
  display: block;
  padding: 0;
  color: #866866;
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
  onChange: (_: string) => void
}

export const TextArea = (props: TProps) => {
  const { name, placeholder, onChange, value } = props

  return (
    <Root>
      <Area
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(evt) => {
          onChange(evt.target.value)
        }}
      />
      <Footer>
        <SubmitButton type="submit">Post</SubmitButton>
      </Footer>
    </Root>
  )
}
