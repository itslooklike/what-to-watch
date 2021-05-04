import { styled } from 'linaria/react'

const Root = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
`

const Input = styled.input`
  display: none;
`

const Label = styled.label`
  font-size: 0;
  line-height: 0;
  display: block;
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

type TProps = {
  name: string
  value: string
  onChange: (_: string) => void
}

export const RatingStars = ({ name, onChange, value }: TProps) => {
  return (
    <Root>
      {Array.from({ length: 5 }).map((_, idx) => {
        const index = `star-${idx + 1}`
        const checked = value === index
        console.log('checked', checked)

        return (
          <div key={idx}>
            <Input
              id={index}
              type="radio"
              name={name}
              value={value}
              onChange={(evt) => {
                const { value } = evt.target
                onChange(value)
              }}
              checked={checked}
            />
            <Label className="rating__label" htmlFor={index}>
              Rating {index}
            </Label>
          </div>
        )
      })}
    </Root>
  )
}
