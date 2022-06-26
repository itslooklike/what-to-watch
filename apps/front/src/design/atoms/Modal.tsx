import { useEffect } from 'react'
import { styled } from '@linaria/react'

import { ClientOnlyPortal } from '~/design/utils'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`

const globalClass = 'modal-is-open'

export const Modal: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  useEffect(() => {
    document.querySelector('body')?.classList.add(globalClass)

    return () => {
      document.querySelector('body')?.classList.remove(globalClass)
    }
  }, [])

  return (
    <ClientOnlyPortal>
      <Backdrop>{children}</Backdrop>
    </ClientOnlyPortal>
  )
}
