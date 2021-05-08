import { useRef, useEffect, useState, FC } from 'react'
import { createPortal } from 'react-dom'

import { portalId } from '~/utils/config'

export const ClientOnlyPortal: FC = ({ children }) => {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // @ts-ignore
    ref.current = document.querySelector(`#${portalId}`)
    setMounted(true)
  }, [])

  // @ts-ignore
  return mounted ? createPortal(children, ref.current) : null
}
