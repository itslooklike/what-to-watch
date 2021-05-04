import { styled } from 'linaria/react'

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

const Input = styled.input`
  display: none;
`

const Label = styled.label`
  font-size: 0;
  line-height: 0;
  display: block;
  padding-right: 10px;
  cursor: pointer;

  ::after {
    content: '★';
    display: block;
    font-size: 32px;
    line-height: 36px;
    color: rgba(56, 44, 42, 0.7);
    transition: color 0.2s;
  }

  ${Input}:checked~&::after {
    color: rgba(56, 44, 42, 0.36);
  }

  ${Input}:checked+&::after {
    color: rgba(56, 44, 42, 0.7);
  }
`

const INIT_RATING = 4

type TProps = {
  name: string
}

export const RatingStars = ({ name }: TProps) => {
  return (
    <Root>
      {Array.from({ length: 5 }).map((_, idx) => {
        const value = idx + 1
        const id = `star-${value}`

        return (
          <>
            <Input id={id} type="radio" name={name} value={value} />
            <Label className="rating__label" htmlFor={id}>
              Rating {value}
            </Label>
          </>
        )
      })}
    </Root>
  )
}
