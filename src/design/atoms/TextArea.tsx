import { styled } from 'linaria/react'

const Root = styled.div`
  background: #e8c3c4;
  border-radius: 8px;
`

const Area = styled.textarea`
  display: block;
  width: 100%;
  border: 0;
  background: 0 0;
  resize: vertical;
  height: 150px;
  min-height: 150px;
  padding: 25px;
  font-size: 17px;
  color: #252525;
  line-height: 24px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`

const SubmitButton = styled.button`
  display: block;
  padding: 0;
  border: 0;
  background: 0 0;
  font-size: 17px;
  color: #866866;
  letter-spacing: 0;
  line-height: 27px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
`

type TProps = {
  name: string
  placeholder?: string
}

export const TextArea = (props: TProps) => {
  const { name, placeholder } = props

  return (
    <Root>
      <Area name={name} placeholder={placeholder}></Area>
      <Footer>
        <SubmitButton type="submit">Post</SubmitButton>
      </Footer>
    </Root>
  )
}
